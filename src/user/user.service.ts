// import dependencies
import { Injectable } from "@nestjs/common";

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
   * @remarks This method returns a user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: { email },
    });
    return user;
  }

  /**
   * Find a user by id
   *
   * @remarks This method returns a user by id
   */
  async findById(id: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: { id },
    });
    return user;
  }

  /**
   * Update a user
   *
   * @remarks This method updates a user
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    // Remove undefined values and hash password if provided
    const { password, ...updateData } = updateUserDto;
    const filteredData = Object.fromEntries(
      Object.entries(updateData).filter(([, value]) => value !== undefined),
    );

    // Hash password if provided
    if (password) {
      filteredData.password = await bcrypt.hash(password, 10);
    }

    const user: User | null = await this.prismaService.user.update({
      where: { id },
      data: filteredData,
    });
    return user;
  }

  /**
   * Delete a user
   *
   * @remarks This method deletes a user
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
   * @remarks This method creates a new user
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
