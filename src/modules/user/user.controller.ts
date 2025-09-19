// import dependencies
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  BadRequestException,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiBadRequestResponse,
} from "@nestjs/swagger";

// import services
import { UserService } from "@modules/user/user.service";

// import dto
import { CreateUserDto } from "@modules/user/dto/create-user.dto";
import { UpdateUserDto } from "@modules/user/dto/update-user.dto";
import { UserResponseDto } from "@modules/user/dto/user-response.dto";
import { User } from "@prisma/client";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Create a user" })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    type: UserResponseDto,
    description: "The user created successfully",
  })
  @ApiBadRequestResponse({
    description: "User not created",
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user: User | null = await this.userService.create(createUserDto);
    if (!user) {
      throw new BadRequestException("User not created");
    }
    return user;
  }

  @ApiOperation({ summary: "Find a user by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiOkResponse({
    type: UserResponseDto,
    description: "The user found successfully",
  })
  @ApiBadRequestResponse({
    description: "User not found",
  })
  @Get(":id")
  async findByID(@Param("id") id: string): Promise<User> {
    const user: User | null = await this.userService.findByID(id);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return user;
  }

  @ApiOperation({ summary: "Update a user by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiOkResponse({
    type: UserResponseDto,
    description: "The user updated successfully",
  })
  @ApiBadRequestResponse({
    description: "User updated failed",
  })
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user: User | null = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new BadRequestException("User updated failed");
    }
    return user;
  }

  @ApiOperation({ summary: "Delete a user by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiOkResponse({
    type: UserResponseDto,
    description: "The user deleted successfully",
  })
  @ApiBadRequestResponse({
    description: "User does not exist",
  })
  @Delete(":id")
  async deleteByID(@Param("id") id: string): Promise<User> {
    const user: User | null = await this.userService.deleteById(id);
    if (!user) {
      throw new BadRequestException("User does not exist");
    }
    return user;
  }
}
