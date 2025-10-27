// import dependencies
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "../../domain/repositories/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import { CLOUD_TOKEN } from "@/modules/cloud/domain/cloud.service";
import { Inject } from "@nestjs/common";
import type { ICloud } from "@/modules/cloud/domain/cloud.service";

/**
 * Delete user use case
 * @description Delete user use case which is used to delete a user.
 */
export class DeleteUserUseCase {
  /**
   * Constructor for DeleteUserUseCase
   * @param userRepository - The user repository
   * @param cloudService - The cloud service
   */
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(CLOUD_TOKEN) private readonly cloudService: ICloud,
  ) {}

  /**
   * Execute the delete user use case
   * @param id - The id of the user
   * @returns True if the user was deleted, false otherwise
   */
  public async execute(id: ObjectIdValueObject): Promise<boolean> {
    // check if the user exists
    const user: UserEntity | null = await this.userRepository.findById(id);
    if (user === null) {
      return false;
    }

    // if the avatar url is not null
    if (user.getAvatarUrl()) {
      // delete the avatar from the cloud
      await this.cloudService.delete(user.getAvatarUrl()!);
    }

    // delete the user
    return await this.userRepository.delete(id);
  }
}
