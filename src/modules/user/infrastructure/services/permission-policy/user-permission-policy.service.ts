import { Injectable } from "@nestjs/common";
import { IPermissionPolicy } from "@shared/domain/services/permission-policy.service";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";

/**
 * User permission policy service
 * @description User permission policy service which is used to check permissions for user resources.
 */
@Injectable()
export class UserPermissionPolicyService
  implements IPermissionPolicy<UserEntity>
{
  /**
   * General rule for permission policy
   * @param user - The user requesting access
   * @param resource - The resource to check access for
   * @returns True if the user can access the resource, false otherwise
   */
  private generalRule(
    user: UserEntity,
    resource: UserEntity | ObjectIdValueObject,
  ): boolean {
    // A user can access a resource if they are an admin or the resource is owned by the user
    let resourceId: string;
    if (resource instanceof UserEntity) {
      resourceId = resource.getId().getId();
    } else {
      resourceId = resource.getId();
    }
    return user.getRole().isAdmin() || user.getId().getId() === resourceId;
  }

  /**
   * Check if a user can access a specific resource
   * @param user - The user requesting access
   * @param resource - The resource to check access for
   * @returns True if the user can access the resource, false otherwise
   */
  public canAccess(
    user: UserEntity,
    resource: UserEntity | ObjectIdValueObject,
  ): boolean {
    return this.generalRule(user, resource);
  }

  /**
   * Check if a user can modify a specific resource
   * @param user - The user requesting modification
   * @param resource - The resource to check modification permission for
   * @returns True if the user can modify the resource, false otherwise
   */
  public canModify(
    user: UserEntity,
    resource: UserEntity | ObjectIdValueObject,
  ): boolean {
    // A user can modify a resource if they are an admin or the resource is owned by the user
    return this.generalRule(user, resource);
  }

  /**
   * Check if a user can delete a specific resource
   * @param user - The user requesting deletion
   * @param resource - The resource to check deletion permission for
   * @returns True if the user can delete the resource, false otherwise
   */
  public canDelete(
    user: UserEntity,
    resource: UserEntity | ObjectIdValueObject,
  ): boolean {
    return this.generalRule(user, resource);
  }

  /**
   * Check if a user can access the collection
   * @param user - The user requesting access
   * @returns True if the user can access the collection, false otherwise
   */
  public canAccessCollection(user: UserEntity): boolean {
    // only admins can access the collection
    return user.getRole().isAdmin();
  }

  /**
   * Check if a user can modify the collection
   * @param user - The user requesting modification
   * @returns True if the user can modify the collection, false otherwise
   */
  public canModifyCollection(user: UserEntity): boolean {
    // only admins can modify the collection
    return user.getRole().isAdmin();
  }
}
