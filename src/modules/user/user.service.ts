/* eslint-disable @typescript-eslint/no-unused-vars */

// import dependencies
import { Injectable } from "@nestjs/common";
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
   * @private
   */
  private filterUser(user: User): UserResponseDto {
    const { password, deletedAt, ...safeUser } = user;
    return safeUser as UserResponseDto;
  }

  /**
   * Find a user by a unique key
   * @param where - The unique key to find the user
   * @returns The user or null if the user is not found
   * @private
   */
  private async findBy(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<UserResponseDto | null> {
    const user: User | null = await this.prisma.user.findUnique({
      where,
    });

    if (!user) return null;

    return this.filterUser(user);
  }

  /**
   * Delete a user by a unique key
   * @param where - The unique key to delete the user
   * @returns The user or null if the user is not found
   * @private
   */
  private async deleteBy(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user: User | null = await this.prisma.user.delete({
      where,
    });

    return user;
  }

  /**
   * Create a user
   * @param createUserDto - The data to create the user
   * @returns The user or null if the user is not found
   */
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // hash the password if it is provided
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    }

    // create the user
    const user: User = await this.prisma.user.create({
      data: createUserDto,
    });

    return this.filterUser(user);
  }

  /**
   * Find a user by id
   * @param id - The id of the user
   * @returns The user or null if the user is not found
   */
  async findByID(id: string): Promise<UserResponseDto | null> {
    return await this.findBy({ id });
  }

  /**
   * Find a user by email
   * @param email - The email of the user
   * @returns The user or null if the user is not found
   */
  async findByEmail(email: string): Promise<UserResponseDto | null> {
    return await this.findBy({ email });
  }

  /**
   * Update a user
   * @param id - The id of the user
   * @param updateUserDto - The data to update the user
   * @returns The user or null if the user is not found
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    // hash the password if it is provided
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // update the user
    const user: User = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return this.filterUser(user);
  }

  /**
   * Delete a user by id
   * @param id - The id of the user
   * @returns The user or null if the user is not found
   */
  async deleteById(id: string): Promise<UserResponseDto | null> {
    const user: User | null = await this.deleteBy({ id });

    if (!user) return null;

    return this.filterUser(user);
  }

  /**
   * Delete a user by email
   * @param email - The email of the user
   * @returns The user or null if the user is not found
   */
  async deleteByEmail(email: string): Promise<UserResponseDto | null> {
    const user: User | null = await this.deleteBy({ email });

    if (!user) return null;

    return this.filterUser(user);
  }
}
