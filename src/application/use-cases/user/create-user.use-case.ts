// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import entities
import { UserEntity } from "@domain/entities/user.entity";

// import exceptions
import { ConflictException } from "@domain/exceptions/conflict-exception";

// import interfaces
import type { IUserRepository } from "@domain/repositories/user.repository";
import type { IPasswordHasher } from "@domain/services/password-hasher.interface";
import type { IImageCompress } from "@domain/services/image-compress.interface";
import type { ICloud } from "@domain/services/cloud.interface";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";
import { PASSWORD_HASHER_TOKEN } from "@domain/services/password-hasher.interface";
import { IMAGE_COMPRESSOR_TOKEN } from "@domain/services/image-compress.interface";
import { CLOUD_TOKEN } from "@domain/services/cloud.interface";

// import value objects
import { UsernameValueObject } from "@domain/value-objects/user/username.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { PasswordValueObject } from "@domain/value-objects/user/password.vo";
import { RoleValueObject } from "@/domain/value-objects/user/role.vo";
import { ProviderValueObject } from "@/domain/value-objects/user/provider.vo";
import { ImageValueObject } from "@/domain/value-objects/common/image.vo";
import { UrlValueObject } from "@/domain/value-objects/common/url.vo";

/**
 * Create user use case
 * @description Create user use case
 */
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
  ) {}

  /**
   * Execute the create user use case
   * @description Execute the create user use case
   * @param username - The username of the user
   * @param email - The email of the user
   * @param password - The password of the user
   * @param provider - The provider of the user
   * @param role - The role of the user
   * @param avatar_url - The avatar url of the user
   * @returns The user entity
   */
  async execute(
    username: UsernameValueObject,
    email: EmailValueObject,
    password: PasswordValueObject,
    provider?: ProviderValueObject | null,
    role?: RoleValueObject | null,
    avatarFile?: ImageValueObject | null,
  ): Promise<UserEntity> {
    let avatarUrl: UrlValueObject | null = null;

    // check if the email is already in use
    const user: UserEntity | null =
      await this.userRepository.findByEmail(email);
    if (user) {
      throw new ConflictException("Email already in use");
    }

    // hash the password
    const hashedPassword: PasswordValueObject =
      await this.passwordHasher.hash(password);

    // if the avatar url is provided
    if (avatarFile) {
      // compress the image
      const compressedImage: ImageValueObject =
        await this.imageCompressor.compressImage(avatarFile);

      // upload the compressed image to the cloud
      avatarUrl = await this.cloudService.upload(compressedImage);
    }

    // create a new user
    const newUser: UserEntity = UserEntity.create(
      username,
      email,
      hashedPassword,
      provider,
      role,
      avatarUrl,
    );

    // save the user
    await this.userRepository.save(newUser);

    // return the user
    return newUser;
  }
}
