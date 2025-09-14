/* eslint-disable @typescript-eslint/no-unused-vars */

// import dependencies
import {
  Controller,
  Delete,
  Body,
  Put,
  Param,
  Get,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";

// import pipes
import { ParseUUIDPipe } from "@nestjs/common";

// import services
import { UserService } from "@/user/user.service";

// import DTO
import { UpdateUserDto } from "@/user/dto/update-user.dto";
import { ResponseUserDto } from "@/auth/dto/response-user.dto";

// import models
import { User } from "@prisma/client";

// import guards
import { IDCheckerGuard } from "@/user/guards/id-checker.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get a user by id
   *
   * @remarks This endpoint returns a user by id
   */
  @Get(":id")
  @UseGuards(IDCheckerGuard)
  async getById(
    @Param(
      "id",
      new ParseUUIDPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            "Invalid user ID format. Please provide a valid UUID.",
          ),
      }),
    )
    id: string,
  ): Promise<ResponseUserDto | null> {
    const user: User | null = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Update a user
   *
   * @remarks This endpoint updates a user
   */
  @UseGuards(IDCheckerGuard)
  @Put(":id")
  async update(
    @Param(
      "id",
      new ParseUUIDPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            "Invalid user ID format. Please provide a valid UUID.",
          ),
      }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto | null> {
    const user: User | null = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Delete a user
   *
   * @remarks This endpoint deletes a user
   */
  @UseGuards(IDCheckerGuard)
  @Delete(":id")
  async delete(
    @Param(
      "id",
      new ParseUUIDPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            "Invalid user ID format. Please provide a valid UUID.",
          ),
      }),
    )
    id: string,
  ): Promise<ResponseUserDto | null> {
    const user: User | null = await this.userService.delete(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
