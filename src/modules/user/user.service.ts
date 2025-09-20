/* eslint-disable @typescript-eslint/no-unused-vars */

// import dependencies
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@modules/database/prisma.service";
import { Prisma, User } from "@prisma/client";
import * as bcrypt from "bcrypt";

// import dto
import { CreateUserDto } from "@modules/user/dto/create-user.dto";
import { UpdateUserDto } from "@modules/user/dto/update-user.dto";
import { UserResponseDto } from "@modules/user/dto/user-response.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Filter out sensitive fields from user
   * @param user - The user to filter
   * @returns The filtered user without password and deletedAt
   * @public
   */
  public filterUser(user: User): UserResponseDto {
    const { password, deletedAt, ...safeUser } = user;
    return safeUser as UserResponseDto;
  }

  /**
   * Find a user by a unique key
   * @param where - The unique key to find the user
   * @param full - Whether to return the full user or the safe user
   * @returns The user or null if the user is not found
   * @private
   */
  private async findBy(
    where: Prisma.UserWhereUniqueInput,
    full: boolean = false,
  ): Promise<UserResponseDto | User | null> {
    const user: User | null = await this.prisma.user.findUnique({
      where,
    });

    if (!user) return null;

    if (full) return user;

    return this.filterUser(user);
  }

  /**
   * Delete a user by a unique key
   * @param where - The unique key to delete the user
   * @param full - Whether to return the full user or the safe user
   * @returns The user or throw exception if the user is not found
   * @private
   */
  private async deleteBy(
    where: Prisma.UserWhereUniqueInput,
    full: boolean = false,
  ): Promise<UserResponseDto | User> {
    try {
      const user: User = await this.prisma.user.delete({
        where,
      });

      if (full) return user;

      return this.filterUser(user);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException("User not found");
      }
      throw new BadRequestException("Failed to delete user");
    }
  }

  /**
   * Create a user
   * @param createUserDto - The data to create the user
   * @param full - Whether to return the full user or the safe user
   * @returns The user or throw exception if the user is not found
   */
  public async create(
    createUserDto: CreateUserDto,
    full: boolean = false,
  ): Promise<UserResponseDto | User> {
    // hash the password if it is provided
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    }

    const checkExists = await this.findByEmail(createUserDto.email);
    if (checkExists) {
      throw new BadRequestException("User already exists");
    }

    // create the user
    const user: User = await this.prisma.user.create({
      data: createUserDto,
    });

    if (full) return user;

    return this.filterUser(user);
  }

  /**
   * Find a user by id
   * @param id - The id of the user
   * @param full - Whether to return the full user or the safe user
   * @public
   * @returns The user or null if the user is not found
   */
  public async findByID(
    id: string,
    full: boolean = false,
  ): Promise<UserResponseDto | User | null> {
    const user: UserResponseDto | User | null = await this.findBy({ id }, full);
    return user;
  }

  /**
   * Find a user by email
   * @param email - The email of the user
   * @param full - Whether to return the full user or the safe user
   * @public
   * @returns The user or null if the user is not found
   */
  public async findByEmail(
    email: string,
    full: boolean = false,
  ): Promise<UserResponseDto | User | null> {
    const user: UserResponseDto | User | null = await this.findBy(
      { email },
      full,
    );
    return user;
  }

  /**
   * Update a user
   * @param id - The id of the user
   * @param updateUserDto - The data to update the user
   * @param full - Whether to return the full user or the safe user
   * @public
   * @returns The user or null if the user is not found
   */
  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
    full: boolean = false,
  ): Promise<UserResponseDto | User> {
    // hash the password if it is provided
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    try {
      // update the user
      const user: User = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      if (full) return user;

      return this.filterUser(user);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException("User not found");
      }
      throw new BadRequestException("Failed to update user");
    }
  }

  /**
   * Delete a user by id
   * @param id - The id of the user
   * @param full - Whether to return the full user or the safe user
   * @public
   * @returns The user or throw exception if the user is not found
   */
  public async deleteById(
    id: string,
    full: boolean = false,
  ): Promise<UserResponseDto | User> {
    const user: UserResponseDto | User = await this.deleteBy({ id }, full);
    return user;
  }

  /**
   * Delete a user by email
   * @param email - The email of the user
   * @param full - Whether to return the full user or the safe user
   * @returns The user or null if the user is not found
   * @public
   */
  public async deleteByEmail(
    email: string,
    full: boolean = false,
  ): Promise<UserResponseDto | User> {
    const user: UserResponseDto | User = await this.deleteBy({ email }, full);
    return user;
  }
}
