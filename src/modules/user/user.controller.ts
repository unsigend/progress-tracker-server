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
  NotFoundException,
  Patch,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";

// import services
import { UserService } from "@modules/user/user.service";
// import pipes
import { ParseUUIDPipe } from "@nestjs/common";
// import dto
import { CreateUserDto } from "@modules/user/dto/create-user.dto";
import { UpdateUserDto } from "@modules/user/dto/update-user.dto";
import { UserResponseDto } from "@modules/user/dto/user-response.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create a user
   * @route POST api/v1/user
   * @param createUserDto - The data to create the user
   * @returns The user or null if the user is not found
   */
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
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user: UserResponseDto | null =
      await this.userService.create(createUserDto);
    if (!user) {
      throw new BadRequestException("User not created");
    }
    return user;
  }

  /**
   * Find a user by id
   * @route GET api/v1/user/:id
   * @param id - The id of the user
   * @returns The user or null if the user is not found
   */
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
  async findByID(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    const user: UserResponseDto | null = await this.userService.findByID(id);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return user;
  }

  /**
   * Update a user by id
   * @route PATCH api/v1/user/:id
   * @param id - The id of the user
   * @param updateUserDto - The data to update the user
   * @returns The user or null if the user is not found
   */
  @ApiOperation({ summary: "Update a user by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    type: UserResponseDto,
    description: "The user updated successfully",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user: UserResponseDto | null = await this.userService.update(
      id,
      updateUserDto,
    );
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  /**
   * Delete a user by id
   * @route DELETE api/v1/user/:id
   * @param id - The id of the user
   * @returns The user or null if the user is not found
   */
  @ApiOperation({ summary: "Delete a user by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiOkResponse({
    type: UserResponseDto,
    description: "The user deleted successfully",
  })
  @ApiNotFoundResponse({
    description: "User does not exist",
  })
  @Delete(":id")
  async deleteByID(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    const user: UserResponseDto | null = await this.userService.deleteById(id);
    if (!user) {
      throw new NotFoundException("User does not exist");
    }
    return user;
  }

  /**
   * Replace a user by id
   * @route PUT api/v1/user/:id
   * @param id - The id of the user
   * @param updateUserDto - The data to update the user
   * @returns The user or null if the user is not found
   */
  @ApiOperation({ summary: "Replace a user by id" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    type: UserResponseDto,
    description: "The user replaced successfully",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @Put(":id")
  async replace(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user: UserResponseDto | null = await this.userService.update(
      id,
      updateUserDto,
    );
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
