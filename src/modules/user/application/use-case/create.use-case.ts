// import dependencies
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "../../domain/repositories/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import { EmailValueObject } from "../../domain/value-object/email.vo";
import { PasswordValueObject } from "../../domain/value-object/password.vo";
import { RoleValueObject } from "../../domain/value-object/role.vo";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";
import { Inject } from "@nestjs/common";
import {
  PASSWORD_HASHER_TOKEN,
  type IPasswordHasher,
} from "../../domain/services/password-hash.service";
import { ConflictException } from "@shared/domain/exceptions/conflict.exception";
import type { IImageCompress } from "@shared/domain/services/image-compress.service";
import { IMAGE_COMPRESSOR_TOKEN } from "@shared/domain/services/image-compress.service";
import type { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import type { ImageValueObject } from "@/shared/domain/value-object/image.vo";
import { PERMISSION_POLICY_TOKEN } from "@shared/domain/services/permission-policy.service";
import type { IPermissionPolicy } from "@shared/domain/services/permission-policy.service";
import { PermissionException } from "@shared/domain/exceptions/permission.exception";

/**
 * Create user use case
 * @description Create user use case which is used to create a new user.
 */
export class CreateUserUseCase {
  /**
   * Constructor for CreateUserUseCase
   * @param userRepository - The user repository
   * @param cloudService - The cloud service
   * @param passwordHasher - The password hasher
   * @param imageCompressor - The image compressor
   */
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(CLOUD_TOKEN) private readonly cloudService: ICloud,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
    @Inject(PERMISSION_POLICY_TOKEN)
    private readonly permissionPolicy: IPermissionPolicy<UserEntity>,
  ) {}

  /**
   * Execute the create user use case
   * @param user - The user requesting the creation
   * @param username - The username of the user
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns The user entity
   */
  public async execute(
    user: UserEntity,
    username: string,
    email: EmailValueObject,
    password: PasswordValueObject,
    role?: RoleValueObject | null,
    avatarImage?: ImageValueObject | null,
  ): Promise<UserEntity> {
    // permission check
    if (!(await this.permissionPolicy.canModifyCollection(user))) {
      throw new PermissionException("Permission denied");
    }

    // check if the email is already in use
    const existingUser: UserEntity | null =
      await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException("Email already in use");
    }

    // hash the password
    const hashedPassword: PasswordValueObject =
      await this.passwordHasher.hash(password);

    // if the avatar file is provided
    let avatarUrl: UrlValueObject | null = null;
    if (avatarImage) {
      // compress the avatar image
      const compressedAvatar: ImageValueObject =
        await this.imageCompressor.compressAvatar(avatarImage);

      // upload the compressed avatar to the cloud
      avatarUrl = await this.cloudService.upload(compressedAvatar);
    }

    // create the user entity
    const userEntity: UserEntity = UserEntity.create(
      username,
      email,
      hashedPassword,
      role,
      avatarUrl,
    );

    // save the user entity
    await this.userRepository.save(userEntity);

    // return the user entity
    return userEntity;
  }
}
