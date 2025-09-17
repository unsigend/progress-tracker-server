/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// import dependencies
import { Injectable, BadRequestException } from "@nestjs/common";

// import services
import { PrismaService } from "@/prisma/prisma.service";

// import DTO
import { UpdateUserDto } from "@/user/dto/update-user.dto";
import { CreateUserDto } from "@/user/dto/create-user.dto";

// import models
import { User } from "@prisma/client";

// import bcrypt
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Find a user by email
   *
   * @remarks This method retrieves a user by their email address
   * @param email - The email address to search for
   * @returns The user if found, null otherwise
   */
  async findByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: { email },
    });
    return user;
  }

  /**
   * Find a user by ID
   *
   * @remarks This method retrieves a user by their unique identifier
   * @param id - The unique identifier of the user
   * @returns The user if found, null otherwise
   */
  async findById(id: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: { id },
    });
    return user;
  }

  /**
   * Update a user (PATCH operation)
   *
   * @remarks This method partially updates a user with only the provided fields
   * @param id - The unique identifier of the user
   * @param updateUserDto - The data to update
   * @returns The updated user or null if not found
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    // Throw an error if the DTO is empty
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException("At least one field must be provided");
    }

    // Remove undefined values and hash password if provided
    const { password, ...updateData } = updateUserDto;
    const filteredData = Object.fromEntries(
      Object.entries(updateData).filter(([, value]) => value !== undefined),
    );

    // Hash password if it is a non-empty string
    if (password && typeof password === "string" && password.length > 0) {
      filteredData.password = await bcrypt.hash(password, 10);
    }

    // If no fields to update, return the existing user
    if (Object.keys(filteredData).length === 0) {
      return await this.findById(id);
    }

    // Update the user with the new data
    const user: User | null = await this.prismaService.user.update({
      where: { id },
      data: filteredData,
    });
    return user;
  }

  /**
   * Replace a user (PUT operation)
   *
   * @remarks This method replaces all user data with the provided data
   * @param id - The unique identifier of the user
   * @param updateUserDto - The complete user data
   * @returns The updated user or null if not found
   */
  async replace(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    // Get the existing user
    const existingUser = await this.findById(id);
    if (!existingUser) {
      return null;
    }

    // Create a new user object with default values
    const newUser: CreateUserDto = {
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
      avatarURL: "",
      provider: ["local"],
    };

    // Merge the new data with the default values
    const { password, ...updateData } = updateUserDto;
    const dataToUpdate: any = { ...newUser, ...updateData };

    // Hash password if provided
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    // Update the user with the new data
    const user: User | null = await this.prismaService.user.update({
      where: { id },
      data: dataToUpdate,
    });
    return user;
  }

  /**
   * Delete a user
   *
   * @remarks This method permanently deletes a user from the database
   * @param id - The unique identifier of the user to delete
   * @returns The deleted user if found, null otherwise
   */
  async delete(id: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.delete({
      where: { id },
    });
    return user;
  }

  /**
   * Create a new user
   *
   * @remarks This method creates a new user account
   * @param createUserDto - The user data for creation
   * @returns The newly created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user: User = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return user;
  }
}
