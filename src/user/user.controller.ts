// import dependencies
import { Controller, Delete, Body, Put, Param, Get } from "@nestjs/common";

// import services
import { UserService } from "@/user/user.service";

// import DTO
import { UpdateUserDto } from "./dto/update-user.dto";

// import models
import { User } from "@prisma/client";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get a user by id
   *
   * @remarks This endpoint returns a user by id
   */
  @Get(":id")
  async getById(@Param("id") id: string): Promise<User | null> {
    const user: User | null = await this.userService.findById(id);
    return user;
  }

  /**
   * Update a user
   *
   * @remarks This endpoint updates a user
   */
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user: User | null = await this.userService.update(id, updateUserDto);
    return user;
  }

  /**
   * Delete a user
   *
   * @remarks This endpoint deletes a user
   */
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<User | null> {
    const user: User | null = await this.userService.delete(id);
    return user;
  }
}
