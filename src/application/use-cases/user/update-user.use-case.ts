// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import entities
import { UserEntity } from "@domain/entities/user.entity";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import interfaces
import type { IUserRepository } from "@domain/repositories/user.repository";
import type { IPasswordHasher } from "@domain/services/password-hasher.interface";
import type { IImageCompress } from "@domain/services/image-compress.interface";
import type { ICloud } from "@domain/services/cloud.interface";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";
import { PASSWORD_HASHER_TOKEN } from "@/domain/services/password-hasher.interface";
import { IMAGE_COMPRESSOR_TOKEN } from "@/domain/services/image-compress.interface";
import { CLOUD_TOKEN } from "@/domain/services/cloud.interface";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { UsernameValueObject } from "@domain/value-objects/user/username.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { PasswordValueObject } from "@domain/value-objects/user/password.vo";
import { ImageValueObject } from "@/domain/value-objects/common/image.vo";
import { RoleValueObject } from "@/domain/value-objects/user/role.vo";
import { ProviderValueObject } from "@/domain/value-objects/user/provider.vo";
import { UrlValueObject } from "@/domain/value-objects/common/url.vo";

/**
 * Update user use case
 * @description Update user use case
 */
@Injectable()
export class UpdateUserUseCase {
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
   * Execute the update user use case
   * @description Execute the update user use case
   * @param id - The id of the user to be updated
   * @param username - The username of the user to be updated
   * @param email - The email of the user to be updated
   * @param password - The password of the user to be updated
   * @returns The user entity
   */
  async execute(
    id: ObjectIdValueObject,
    username?: UsernameValueObject | null,
    email?: EmailValueObject | null,
    password?: PasswordValueObject | null,
    avatarFile?: ImageValueObject | null,
    role?: RoleValueObject | null,
    provider?: ProviderValueObject | null,
  ): Promise<UserEntity> {
    // find the user by id
    const user: UserEntity | null = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // if the username is provided, update the username
    if (username) {
      user.setUsername(username);
    }

    // if the email is provided, update the email
    if (email) {
      user.setEmail(email);
    }

    // if the password is provided, update the password
    if (password) {
      const hashedPassword: PasswordValueObject =
        await this.passwordHasher.hash(password);
      user.setPassword(hashedPassword);
    }

    // if the avatar file is provided, update the avatar
    if (avatarFile) {
      // if the user has an avatar url, delete the image from the cloud
      // compress the image
      const compressedImage: ImageValueObject =
        await this.imageCompressor.compressImage(avatarFile);

      // upload the compressed image to the cloud
      const avatarUrl: UrlValueObject =
        await this.cloudService.upload(compressedImage);

      // set the avatar url of the user
      user.setAvatarUrl(avatarUrl);
    }

    // if the role is provided, update the role
    if (role) {
      user.setRole(role);
    }

    // if the provider is provided, update the provider
    if (provider) {
      user.setProvider(provider);
    }

    // save the user
    await this.userRepository.save(user);

    // return the user
    return user;
  }
}
