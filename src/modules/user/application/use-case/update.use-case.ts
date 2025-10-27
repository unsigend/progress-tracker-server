// import dependencies
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserEntity } from "../../domain/entities/user.entity";
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "../../domain/repositories/user.repository";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";
import { EmailValueObject } from "../../domain/value-object/email.vo";
import { PasswordValueObject } from "../../domain/value-object/password.vo";
import { RoleValueObject } from "../../domain/value-object/role.vo";
import { ImageValueObject } from "@/shared/domain/value-object/image.vo";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { CLOUD_TOKEN } from "@/modules/cloud/domain/cloud.service";
import { Inject } from "@nestjs/common";
import type { ICloud } from "@/modules/cloud/domain/cloud.service";
import { IMAGE_COMPRESSOR_TOKEN } from "@shared/domain/services/image-compress.service";
import type { IImageCompress } from "@shared/domain/services/image-compress.service";

/**
 * Update user use case
 * @description Update user use case which is used to update a user.
 */
export class UpdateUserUseCase {
  /**
   * Constructor for UpdateUserUseCase
   * @param userRepository - The user repository
   */
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(CLOUD_TOKEN) private readonly cloudService: ICloud,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
  ) {}

  /**
   * Execute the update user use case
   * @param id - The id of the user
   * @param username - The username of the user
   * @param email - The email of the user
   * @param password - The password of the user
   * @param role - The role of the user
   * @param avatarImage - The avatar image of the user
   * @returns The updated user
   */
  public async execute(
    id: ObjectIdValueObject,
    username?: string | null,
    email?: EmailValueObject | null,
    password?: PasswordValueObject | null,
    role?: RoleValueObject | null,
    avatarImage?: ImageValueObject | null,
  ): Promise<UserEntity> {
    // check if the user exists
    const user: UserEntity | null = await this.userRepository.findById(id);
    if (user === null) {
      throw new NotFoundException("User not found");
    }

    // if the username is provided
    if (username) {
      user.setUsername(username);
    }

    // if the email is provided
    if (email) {
      user.setEmail(email);
    }

    // if the password is provided
    if (password) {
      user.setPassword(password);
    }

    // if the role is provided
    if (role) {
      user.setRole(role);
    }

    // if the avatar image is provided
    if (avatarImage) {
      // delete the old avatar from the cloud
      if (user.getAvatarUrl()) {
        await this.cloudService.delete(user.getAvatarUrl()!);
      }

      // compress the avatar image
      const compressedAvatar: ImageValueObject =
        await this.imageCompressor.compressAvatar(avatarImage);

      // upload the compressed avatar to the cloud
      const avatarUrl: UrlValueObject =
        await this.cloudService.upload(compressedAvatar);

      // set the new avatar url
      user.setAvatarUrl(avatarUrl);
    }

    // save the user
    await this.userRepository.save(user);

    // return the user
    return user;
  }
}
