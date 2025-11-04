// import dependencies
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "../../domain/repositories/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";
import { Inject } from "@nestjs/common";
import { PERMISSION_POLICY_TOKEN } from "@shared/domain/services/permission-policy.service";
import type { IPermissionPolicy } from "@shared/domain/services/permission-policy.service";
import { PermissionException } from "@shared/domain/exceptions/permission.exception";
/**
 * Find user by id use case
 * @description Find user by id use case which is used to find a user by id.
 */
export class FindUserIdUseCase {
  /**
   * Constructor for FindUserIdUseCase
   * @param userRepository - The user repository
   */
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PERMISSION_POLICY_TOKEN)
    private readonly permissionPolicy: IPermissionPolicy<UserEntity>,
  ) {}

  /**
   * Execute the find user by id use case
   * @param user - The user requesting the find user by id
   * @param id - The id of the user
   * @returns The user
   */
  public async execute(
    user: UserEntity,
    id: ObjectIdValueObject,
  ): Promise<UserEntity> {
    // permission check
    if (!(await this.permissionPolicy.canAccess(user, id))) {
      throw new PermissionException("Permission denied");
    }

    // check if the user exists
    const foundUser: UserEntity | null = await this.userRepository.findById(id);
    if (foundUser === null) {
      throw new NotFoundException("User not found");
    }

    // return the user
    return foundUser;
  }
}
