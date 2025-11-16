/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { IPermissionPolicy } from "@shared/domain/services/permission-policy.service";
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";

/**
 * Book permission policy service
 * @description Book permission policy service which is used to check permissions for book resources.
 */
@Injectable()
export class BookPermissionPolicyService
  implements IPermissionPolicy<BookEntity>
{
  /**
   * General rule for permission policy
   * @param user - The user requesting access
   * @param resource - The resource to check access for
   * @returns True if the user can access the resource, false otherwise
   */
  private generalRule(
    user: UserEntity,
    resource: BookEntity | ObjectIdValueObject,
  ): boolean {
    if (resource instanceof ObjectIdValueObject) {
      throw new Error(
        "Fatal Error: Resource must be a BookEntity to get context.",
      );
    }
    // A user can access a book if they are admin or the creator of the book
    return (
      user.getRole().isAdmin() ||
      user.getId().getId() === resource.getCreatedById().getId()
    );
  }

  /**
   * Check if a user can access a specific resource
   * @param user - The user requesting access
   * @param resource - The resource to check access for
   * @returns True if the user can access the resource, false otherwise
   */
  public canAccess(
    user: UserEntity,
    resource: BookEntity | ObjectIdValueObject,
  ): boolean {
    // always allow access to the book
    return true;
  }

  /**
   * Check if a user can modify a specific resource
   * @param user - The user requesting modification
   * @param resource - The resource to check modification permission for
   * @returns True if the user can modify the resource, false otherwise
   */
  public canModify(
    user: UserEntity,
    resource: BookEntity | ObjectIdValueObject,
  ): boolean {
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
    resource: BookEntity | ObjectIdValueObject,
  ): boolean {
    return this.generalRule(user, resource);
  }

  /**
   * Check if a user can access the collection
   * @param user - The user requesting access
   * @returns True if the user can access the collection, false otherwise
   */
  public canAccessCollection(user: UserEntity): boolean {
    // always allow access to the collection
    return true;
  }

  /**
   * Check if a user can modify the collection
   * @param user - The user requesting modification
   * @returns True if the user can modify the collection, false otherwise
   */
  public canModifyCollection(user: UserEntity): boolean {
    // always allow create book
    return true;
  }
}
