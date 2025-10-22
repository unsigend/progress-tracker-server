// import dependencies
import {
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  Put,
  Delete,
  Controller,
  Get,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

// import entities
import { UserEntity } from "@domain/entities/user.entity";
import { UserQuery } from "@domain/repositories/queries/user.query";

// import use cases
import { CreateUserUseCase } from "@/application/use-cases/user/create-user.use-case";
import { UpdateUserUseCase } from "@/application/use-cases/user/update-user.use-case";
import { DeleteUserUseCase } from "@/application/use-cases/user/delete-user.use-case";
import { FindUserByIdUseCase } from "@/application/use-cases/user/find-user-id.use-case";
import { FindAllUsersUseCase } from "@/application/use-cases/user/find-all-user.use-case";

// import dtos
import { CreateUserRequestDto } from "@/presentation/dtos/user/create-user.request.dto";
import { UpdateUserRequestDto } from "@/presentation/dtos/user/update-user.request.dto";
import { QueryUserRequestDto } from "@/presentation/dtos/user/query-user.request.dto";

// import value objects
import { UsernameValueObject } from "@domain/value-objects/user/username.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { PasswordValueObject } from "@domain/value-objects/user/password.vo";
import { ProviderValueObject } from "@domain/value-objects/user/provider.vo";
import { RoleValueObject } from "@domain/value-objects/user/role.vo";
import { ImageValueObject } from "@domain/value-objects/common/image.vo";
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

// import mappers
import { UserMapper } from "@/presentation/mappers/user.mapper";

/**
 * User controller
 * @description Handles user management operations
 */
@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
  ) {}

  /**
   * Get all users
   */
  @Get()
  async findAll(@Query() queryUserRequestDto: QueryUserRequestDto) {
    // get all users
    const { users, totalCount } = await this.findAllUsersUseCase.execute(
      new UserQuery(
        queryUserRequestDto.key,
        queryUserRequestDto.value,
        queryUserRequestDto.sort,
        queryUserRequestDto.order,
        queryUserRequestDto.limit,
        queryUserRequestDto.page,
      ),
    );
    // return the users
    return {
      users: users.map((user) => UserMapper.toResponseDto(user)),
      totalCount,
    };
  }

  /**
   * Create a new user
   */
  @Post()
  @UseInterceptors(FileInterceptor("avatar"))
  async create(
    @Body() createUserRequestDto: CreateUserRequestDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    // create a new user
    const user: UserEntity = await this.createUserUseCase.execute(
      new UsernameValueObject(createUserRequestDto.username),
      new EmailValueObject(createUserRequestDto.email),
      new PasswordValueObject(createUserRequestDto.password),
      createUserRequestDto.provider
        ? new ProviderValueObject(createUserRequestDto.provider)
        : null,
      createUserRequestDto.role
        ? new RoleValueObject(createUserRequestDto.role)
        : null,
      avatar ? new ImageValueObject(avatar.buffer, avatar.mimetype) : null,
    );
    // return the user
    return UserMapper.toResponseDto(user);
  }

  /**
   * Get a user by ID
   */
  @Get(":id")
  async findById(@Param("id") id: string) {
    // get the user
    const user: UserEntity = await this.findUserByIdUseCase.execute(
      new ObjectIdValueObject(id),
    );
    // return the user
    return UserMapper.toResponseDto(user);
  }

  /**
   * Update a user by ID
   */
  @Put(":id")
  @UseInterceptors(FileInterceptor("avatar"))
  async update(
    @Param("id") id: string,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    // update the user
    const user: UserEntity = await this.updateUserUseCase.execute(
      new ObjectIdValueObject(id),
      updateUserRequestDto.username
        ? new UsernameValueObject(updateUserRequestDto.username)
        : null,
      updateUserRequestDto.email
        ? new EmailValueObject(updateUserRequestDto.email)
        : null,
      updateUserRequestDto.password
        ? new PasswordValueObject(updateUserRequestDto.password)
        : null,
      updateUserRequestDto.provider
        ? new ProviderValueObject(updateUserRequestDto.provider)
        : null,
      updateUserRequestDto.role
        ? new RoleValueObject(updateUserRequestDto.role)
        : null,
      avatar ? new ImageValueObject(avatar.buffer, avatar.mimetype) : null,
    );
    // return the user
    return UserMapper.toResponseDto(user);
  }

  /**
   * Delete a user by ID
   */
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<{ success: boolean }> {
    // delete the user
    await this.deleteUserUseCase.execute(new ObjectIdValueObject(id));
    // return the success response
    return { success: true };
  }
}
