// import dependencies
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@modules/database/prisma.service";
import { Prisma, User } from "@prisma/client";
import * as bcrypt from "bcrypt";

// import dto
import { CreateUserDto } from "@modules/user/dto/create-user.dto";
import { UpdateUserDto } from "@modules/user/dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find a user by a unique key
   * @param where - The unique key to find the user
   * @returns The user or null if the user is not found
   * @private
   */
  private async findBy(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user: User | null = await this.prisma.user.findUnique({
      where,
    });

    return user;
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
  async create(createUserDto: CreateUserDto): Promise<User> {
    // hash the password if it is provided
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    }

    // create the user
    const user: User | null = await this.prisma.user.create({
      data: createUserDto,
    });

    return user;
  }

  /**
   * Find a user by id
   * @param id - The id of the user
   * @returns The user or null if the user is not found
   */
  async findByID(id: string): Promise<User | null> {
    const user: User | null = await this.findBy({ id });

    return user;
  }

  /**
   * Find a user by email
   * @param email - The email of the user
   * @returns The user or null if the user is not found
   */
  async findByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.findBy({ email });

    return user;
  }

  /**
   * Update a user
   * @param id - The id of the user
   * @param updateUserDto - The data to update the user
   * @returns The user or null if the user is not found
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // hash the password if it is provided
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // update the user
    const user: User | null = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return user;
  }

  /**
   * Delete a user by id
   * @param id - The id of the user
   * @returns The user or null if the user is not found
   */
  async deleteById(id: string): Promise<User | null> {
    const user: User | null = await this.deleteBy({ id });

    return user;
  }

  /**
   * Delete a user by email
   * @param email - The email of the user
   * @returns The user or null if the user is not found
   */
  async deleteByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.deleteBy({ email });

    return user;
  }
}
