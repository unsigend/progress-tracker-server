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
import { PERMISSION_POLICY_TOKEN } from "@shared/domain/services/permission-policy.service";
import type { IPermissionPolicy } from "@shared/domain/services/permission-policy.service";
import { PermissionException } from "@shared/domain/exceptions/permission.exception";
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
    @Inject(PERMISSION_POLICY_TOKEN)
    private readonly permissionPolicy: IPermissionPolicy<UserEntity>,
  ) {}

  /**
   * Execute the delete user use case
   * @param user - The user requesting the deletion
   * @param id - The id of the user
   * @returns True if the user was deleted, false otherwise
   */
  public async execute(
    user: UserEntity,
    id: ObjectIdValueObject,
  ): Promise<boolean> {
    // permission check
    if (!(await this.permissionPolicy.canDelete(user, id))) {
      throw new PermissionException("Permission denied");
    }

    // check if the user exists
    const deletedUser: UserEntity | null =
      await this.userRepository.findById(id);
    if (deletedUser === null) {
      return false;
    }

    // if the avatar url is not null
    if (deletedUser.getAvatarUrl()) {
      // delete the avatar from the cloud
      await this.cloudService.delete(deletedUser.getAvatarUrl()!);
    }

    // delete the user
    return await this.userRepository.delete(id);
  }
}
