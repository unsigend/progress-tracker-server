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
import { UserCreateDto } from "@modules/user/dto/user-create.dto";
import { UserUpdateDto } from "@modules/user/dto/user-update.dto";
import { UserResponseDto } from "@modules/user/dto/user-response.dto";

// import services
import { ConfigService } from "@nestjs/config";
import { S3Service } from "../S3/S3.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
  ) {}

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
    createUserDto: UserCreateDto,
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
    updateUserDto: UserUpdateDto,
    full: boolean = false,
  ): Promise<UserResponseDto | User> {
    // hash the password if it is provided
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    try {
      // if the user has a avatar url and the old avatar url is in AWS S3
      const bucketName: string = this.configService.get(
        "s3.AWS_S3_BUCKET_NAME",
      )!;
      const region: string = this.configService.get("s3.AWS_S3_REGION")!;
      const AWS_S3_prefix = `https://${bucketName}.s3.${region}.amazonaws.com/`;
      const oldUser = await this.findByID(id, true);
      if (!oldUser) {
        throw new NotFoundException("User not found");
      }
      if (
        updateUserDto.avatar_url &&
        oldUser.avatar_url &&
        oldUser.avatar_url.startsWith(AWS_S3_prefix)
      ) {
        // delete the old AWS S3 avatar file
        await this.s3Service.delete(oldUser.avatar_url);
      }

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

  /**
   * Create or link a user
   * If the user exists, link the user to the provider
   * If the user does not exist, create the user
   * @param createUserDto - The data to create the user
   * @param provider - The provider to link the user to
   * @returns The user or null if the user is not found
   * @public
   */
  public async createOrLinkUser(
    createUserDto: UserCreateDto,
    provider: string,
  ): Promise<UserResponseDto> {
    const existingUser: UserResponseDto = (await this.findByEmail(
      createUserDto.email,
      false,
    )) as UserResponseDto;

    if (existingUser) {
      // if the user exists, link the user to the provider
      const updatedUserDto: UserUpdateDto = {};

      // update the avatar url only if the old avatar url is null
      if (createUserDto.avatar_url && !existingUser.avatar_url) {
        updatedUserDto.avatar_url = createUserDto.avatar_url;
      }

      // update the provider only if it is not already included
      if (!existingUser.provider.includes(provider)) {
        updatedUserDto.provider = [...existingUser.provider, provider];
      }

      const updatedUser: User = await this.prisma.user.update({
        where: { id: existingUser.id },
        data: updatedUserDto,
      });
      return this.filterUser(updatedUser);
    } else {
      // if the user does not exist, create the user
      const newCreateUserDto: UserCreateDto = {
        ...createUserDto,
        avatar_url: createUserDto.avatar_url ?? null,
        provider: [provider],
      };
      const newUser: UserResponseDto = (await this.create(
        newCreateUserDto,
        false,
      )) as UserResponseDto;
      return newUser;
    }
  }
}
