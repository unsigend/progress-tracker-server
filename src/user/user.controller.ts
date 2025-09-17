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
  UnauthorizedException,
  Request,
  Patch,
} from "@nestjs/common";

// import pipes
import { ParseUUIDPipe } from "@nestjs/common";

// import services
import { UserService } from "@/user/user.service";

// import DTO
import { UpdateUserDto } from "@/user/dto/update-user.dto";
import { ResponseUserDto } from "@/user/dto/response-user.dto";

// import models
import { User } from "@prisma/client";

// import guards
import { IDCheckerGuard } from "@/user/guards/id-checker.guard";

// import swagger decorators
import {
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiResponse,
} from "@nestjs/swagger";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get a user by id
   *
   * @remarks This endpoint returns a user by id
   */
  @ApiResponse({
    status: 200,
    description: "User retrieved successfully",
    type: ResponseUserDto,
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiForbiddenResponse({
    description: "Forbidden",
  })
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
  @ApiResponse({
    status: 200,
    description: "User updated successfully",
    type: ResponseUserDto,
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiForbiddenResponse({
    description: "Forbidden",
  })
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
  @ApiResponse({
    status: 200,
    description: "User deleted successfully",
    type: ResponseUserDto,
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiForbiddenResponse({
    description: "Forbidden",
  })
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

  /**
   * Get the current user data
   *
   * @remarks This endpoint returns the current user data
   */
  @ApiResponse({
    status: 200,
    description: "User data retrieved successfully",
    type: ResponseUserDto,
  })
  @ApiUnauthorizedResponse({
    description: "User not found",
  })
  @Get("me")
  async me(
    @Request() request: Request & { user: { sub: string } },
  ): Promise<ResponseUserDto | null> {
    const userID: string = request.user.sub;
    if (!userID) {
      throw new UnauthorizedException("User not found");
    }
    const user: User | null = await this.userService.findById(userID);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Patch the current user data
   *
   * @remarks This endpoint patches the current user data
   */
  @ApiOkResponse({
    description: "User data patched successfully",
    type: ResponseUserDto,
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @Patch("me")
  async patchMe(
    @Body() updateUserDto: UpdateUserDto,
    @Request() request: Request & { user: { sub: string } },
  ): Promise<ResponseUserDto | null> {
    const userID: string = request.user.sub;
    if (!userID) {
      throw new UnauthorizedException("User not found");
    }
    const user: User | null = await this.userService.update(
      userID,
      updateUserDto,
    );
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Delete the current user
   *
   * @remarks This endpoint deletes the current user
   */
  @ApiOkResponse({
    description: "User deleted successfully",
    type: ResponseUserDto,
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @Delete("me")
  async deleteMe(
    @Request() request: Request & { user: { sub: string } },
  ): Promise<ResponseUserDto | null> {
    // get the user ID from the request
    const userID: string = request.user.sub;
    if (!userID) {
      throw new UnauthorizedException("User not found");
    }

    // delete the user
    const user: User | null = await this.userService.delete(userID);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
