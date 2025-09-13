// import dependencies
import { Injectable } from "@nestjs/common";

// import services
import { PrismaService } from "@/prisma/prisma.service";

// import DTO
import { UpdateUserDto } from "@/user/dto/update-user.dto";

// import models
import { User } from "@prisma/client";

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
    const user: User | null = await this.prismaService.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        updatedAt: new Date(),
      },
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
}
