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
  ApiUnauthorizedResponse,
  ApiResponse,
} from "@nestjs/swagger";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get current user profile
   *
   * @remarks Retrieves the authenticated user's profile information
   * @returns The current user's profile data
   */
  @ApiResponse({
    status: 200,
    description: "User profile retrieved successfully",
    type: ResponseUserDto,
  })
  @ApiUnauthorizedResponse({
    description: "User not authenticated",
  })
  @ApiForbiddenResponse({
    description: "Access forbidden",
  })
  @Get("me")
  async getCurrentUser(
    @Request() request: Request & { user: { sub: string } },
  ): Promise<ResponseUserDto> {
    const userID: string = request.user.sub;
    if (!userID) {
      throw new UnauthorizedException("User not authenticated");
    }
    const user: User | null = await this.userService.findById(userID);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Update current user profile (PATCH)
   *
   * @remarks Partially updates the authenticated user's profile with only provided fields
   * @param updateUserDto - The fields to update
   * @returns The updated user profile
   */
  @ApiResponse({
    status: 200,
    description: "User profile updated successfully",
    type: ResponseUserDto,
  })
  @ApiUnauthorizedResponse({
    description: "User not authenticated",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiForbiddenResponse({
    description: "Access forbidden",
  })
  @Patch("me")
  async updateCurrentUser(
    @Body() updateUserDto: UpdateUserDto,
    @Request() request: Request & { user: { sub: string } },
  ): Promise<ResponseUserDto> {
    const userID: string = request.user.sub;
    if (!userID) {
      throw new UnauthorizedException("User not authenticated");
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
   * Replace current user profile (PUT)
   *
   * @remarks Completely replaces the authenticated user's profile data
   * @param updateUserDto - The complete user data
   * @returns The updated user profile
   */
  @ApiResponse({
    status: 200,
    description: "User profile replaced successfully",
    type: ResponseUserDto,
  })
  @ApiUnauthorizedResponse({
    description: "User not authenticated",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiForbiddenResponse({
    description: "Access forbidden",
  })
  @Put("me")
  async replaceCurrentUser(
    @Body() updateUserDto: UpdateUserDto,
    @Request() request: Request & { user: { sub: string } },
  ): Promise<ResponseUserDto> {
    const userID: string = request.user.sub;
    if (!userID) {
      throw new UnauthorizedException("User not authenticated");
    }
    const user: User | null = await this.userService.replace(
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
   * Delete current user account
   *
   * @remarks Permanently deletes the authenticated user's account
   * @returns The deleted user profile
   */
  @ApiResponse({
    status: 200,
    description: "User account deleted successfully",
    type: ResponseUserDto,
  })
  @ApiUnauthorizedResponse({
    description: "User not authenticated",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiForbiddenResponse({
    description: "Access forbidden",
  })
  @Delete("me")
  async deleteCurrentUser(
    @Request() request: Request & { user: { sub: string } },
  ): Promise<ResponseUserDto> {
    const userID: string = request.user.sub;
    if (!userID) {
      throw new UnauthorizedException("User not authenticated");
    }

    const user: User | null = await this.userService.delete(userID);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Get user by ID
   *
   * @remarks Retrieves a specific user's profile by their unique identifier
   * @param id - The unique identifier of the user
   * @returns The user's profile data
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
    description: "Access forbidden",
  })
  @Get(":id")
  @UseGuards(IDCheckerGuard)
  async getUserById(
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
  ): Promise<ResponseUserDto> {
    const user: User | null = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Update user by ID (PATCH)
   *
   * @remarks Partially updates a specific user's profile with only provided fields
   * @param id - The unique identifier of the user
   * @param updateUserDto - The fields to update
   * @returns The updated user profile
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
    description: "Access forbidden",
  })
  @UseGuards(IDCheckerGuard)
  @Patch(":id")
  async updateUserById(
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
  ): Promise<ResponseUserDto> {
    const user: User | null = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Replace user by ID (PUT)
   *
   * @remarks Completely replaces a specific user's profile data
   * @param id - The unique identifier of the user
   * @param updateUserDto - The complete user data
   * @returns The updated user profile
   */
  @ApiResponse({
    status: 200,
    description: "User replaced successfully",
    type: ResponseUserDto,
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiForbiddenResponse({
    description: "Access forbidden",
  })
  @UseGuards(IDCheckerGuard)
  @Put(":id")
  async replaceUserById(
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
  ): Promise<ResponseUserDto> {
    const user: User | null = await this.userService.replace(id, updateUserDto);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Delete user by ID
   *
   * @remarks Permanently deletes a specific user's account
   * @param id - The unique identifier of the user to delete
   * @returns The deleted user profile
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
    description: "Access forbidden",
  })
  @UseGuards(IDCheckerGuard)
  @Delete(":id")
  async deleteUserById(
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
  ): Promise<ResponseUserDto> {
    const user: User | null = await this.userService.delete(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
