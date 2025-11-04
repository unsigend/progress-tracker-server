// import dependencies
import type { UserEntity } from "@/modules/user/domain/entities/user.entity";
import type { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";

/**
 * Permission Policy token
 * @description Permission Policy token which is used to inject the permission policy.
 */
export const PERMISSION_POLICY_TOKEN = Symbol("PERMISSION_POLICY_TOKEN");

/**
 * Permission Policy interface
 * @description Permission Policy interface which is used to check permissions for resources.
 * @template TResource - The resource entity type
 */
export interface IPermissionPolicy<TResource> {
  /**
   * Check if a user can access a specific resource
   * @description Check if a user can access a specific resource
   * @param user - The user requesting access
   * @param resource - The resource to check access for
   * @returns True if the user can access the resource, false otherwise
   */
  canAccess(
    user: UserEntity,
    resource: TResource | ObjectIdValueObject,
  ): boolean | Promise<boolean>;

  /**
   * Check if a user can modify a specific resource
   * @description Check if a user can modify a specific resource
   * @param user - The user requesting modification
   * @param resource - The resource to check modification permission for
   * @returns True if the user can modify the resource, false otherwise
   */
  canModify(
    user: UserEntity,
    resource: TResource | ObjectIdValueObject,
  ): boolean | Promise<boolean>;

  /**
   * Check if a user can delete a specific resource
   * @description Check if a user can delete a specific resource
   * @param user - The user requesting deletion
   * @param resource - The resource to check deletion permission for
   * @returns True if the user can delete the resource, false otherwise
   */
  canDelete(
    user: UserEntity,
    resource: TResource | ObjectIdValueObject,
  ): boolean | Promise<boolean>;

  /**
   * Check if a user can access the collection/endpoint (e.g., GET /resources)
   * @description Check if a user can access collection endpoints
   * @param user - The user requesting access
   * @returns True if the user can access the collection, false otherwise
   */
  canAccessCollection(user: UserEntity): boolean | Promise<boolean>;

  /**
   * Check if a user can modify/create resources in the collection (e.g., POST /resources)
   * @description Check if a user can modify/create in collection
   * @param user - The user requesting modification
   * @returns True if the user can modify/create in collection, false otherwise
   */
  canModifyCollection(user: UserEntity): boolean | Promise<boolean>;
}
