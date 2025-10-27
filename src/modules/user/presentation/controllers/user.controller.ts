// import dependencies
import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
  Delete,
  Param,
  Put,
} from "@nestjs/common";
import { FindAllUsersUseCase } from "../../application/use-case/find-all.use-case";
import { UserQueryRequestDto } from "../dtos/query.request.dto";
import { UserResponseDto } from "../dtos/user.response.dto";
import { UserMapper } from "../../infrastructure/mapper/user.mapper";
import { CreateUserRequestDto } from "../dtos/create.request.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserUseCase } from "../../application/use-case/create.use-case";
import { UserEntity, UserRole } from "../../domain/entities/user.entity";
import { EmailValueObject } from "../../domain/value-object/email.vo";
import { PasswordValueObject } from "../../domain/value-object/password.vo";
import { RoleValueObject } from "../../domain/value-object/role.vo";
import { ImageValueObject } from "@/shared/domain/value-object/image.vo";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { DeleteUserUseCase } from "../../application/use-case/delete.use-case";
import { UpdateUserRequestDto } from "../dtos/update.request.dto";
import { UpdateUserUseCase } from "../../application/use-case/update.use-case";
import { FindUserIdUseCase } from "../../application/use-case/find-id.use-case";

/**
 * User controller
 * @description User controller which is used to handle the user requests.
 */
@Controller("users")
export class UserController {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findUserByIdUseCase: FindUserIdUseCase,
  ) {}

  /**
   * Find all users
   */
  @Get()
  public async findAll(
    @Query() query: UserQueryRequestDto,
  ): Promise<{ data: UserResponseDto[]; totalCount: number }> {
    // find all users
    const { data, totalCount } = await this.findAllUsersUseCase.execute(
      query.field,
      query.value,
      query.limit,
      query.page,
      query.sort,
      query.order,
    );

    // map the users to the user response dtos
    const userResponseDtos: UserResponseDto[] = data.map((user) =>
      UserMapper.toResponseDto(user),
    );

    // return the users
    return { data: userResponseDtos, totalCount };
  }

  /**
   * Create a user
   */
  @Post()
  @UseInterceptors(FileInterceptor("avatarImage"))
  public async create(
    @Body() createUserRequestDto: CreateUserRequestDto,
    @UploadedFile() avatarImage: Express.Multer.File,
  ): Promise<UserResponseDto> {
    // create the user entity
    const userEntity: UserEntity = await this.createUserUseCase.execute(
      createUserRequestDto.username,
      new EmailValueObject(createUserRequestDto.email),
      new PasswordValueObject(createUserRequestDto.password),
      new RoleValueObject(createUserRequestDto.role ?? UserRole.USER),
      avatarImage
        ? new ImageValueObject(avatarImage.buffer, avatarImage.mimetype)
        : null,
    );

    // map the user entity to the user response dto
    const userResponseDto: UserResponseDto =
      UserMapper.toResponseDto(userEntity);

    // return the user response dto
    return userResponseDto;
  }

  /**
   * Find a user by id
   */
  @Get(":id")
  public async findById(@Param("id") id: string): Promise<UserResponseDto> {
    const userEntity: UserEntity = await this.findUserByIdUseCase.execute(
      new ObjectIdValueObject(id),
    );
    return UserMapper.toResponseDto(userEntity);
  }

  /**
   * Delete a user
   */
  @Delete(":id")
  public async delete(@Param("id") id: string): Promise<{ success: boolean }> {
    const result: boolean = await this.deleteUserUseCase.execute(
      new ObjectIdValueObject(id),
    );
    return { success: result };
  }

  /**
   * Update a user
   */
  @Put(":id")
  @UseInterceptors(FileInterceptor("avatarImage"))
  public async update(
    @Param("id") id: string,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
    @UploadedFile() avatarImage: Express.Multer.File,
  ): Promise<UserResponseDto> {
    const userEntity: UserEntity = await this.updateUserUseCase.execute(
      new ObjectIdValueObject(id),
      updateUserRequestDto.username,
      updateUserRequestDto.email
        ? new EmailValueObject(updateUserRequestDto.email)
        : null,
      updateUserRequestDto.password
        ? new PasswordValueObject(updateUserRequestDto.password)
        : null,
      updateUserRequestDto.role
        ? new RoleValueObject(updateUserRequestDto.role)
        : null,
      avatarImage
        ? new ImageValueObject(avatarImage.buffer, avatarImage.mimetype)
        : null,
    );
    return UserMapper.toResponseDto(userEntity);
  }
}
