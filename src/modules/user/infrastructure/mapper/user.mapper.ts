// import dependencies
import {
  UserEntity,
  UserRole,
} from "@/modules/user/domain/entities/user.entity";
import { User as UserModel, UserRole as UserRoleModel } from "@prisma/client";
import { ObjectIdValueObject } from "@shared/domain/value-object/object-id.vo";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";
import { PasswordValueObject } from "@/modules/user/domain/value-object/password.vo";
import { RoleValueObject } from "@modules/user/domain/value-object/role.vo";
import { ProviderValueObject } from "@modules/user/domain/value-object/provider.vo";
import { UrlValueObject } from "@shared/domain/value-object/url.vo";

/**
 * User mapper
 * @description User mapper which is used to map the user entity to the user model and vice versa.
 */
export class UserMapper {
  /**
   * Map a user role entity to a user role model
   * @param role - The user role entity to map
   * @returns The user role model
   */
  private static toUserRoleModel(role: UserRole): UserRoleModel {
    return UserRoleModel[role.toUpperCase() as keyof typeof UserRoleModel];
  }
  /**
   * Map a user role model to a user role entity
   * @param role - The user role model to map
   * @returns The user role entity
   */
  private static toUserRoleEntity(role: UserRoleModel): UserRole {
    return UserRole[role.toUpperCase() as keyof typeof UserRole];
  }
  /**
   * Map a user entity to a user model
   * @param user - The user entity to map
   * @returns The user model
   */
  public static toModel(user: UserEntity): UserModel {
    return {
      id: user.getId().getId(),
      username: user.getUsername(),
      email: user.getEmail().getEmail(),
      password: user.getPassword().getPassword(),
      avatar_url: user.getAvatarUrl()?.getUrl() ?? null,
      provider: user.getProvider().getProvider(),
      role: user.getRole().getRole(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
      deletedAt: user.getDeletedAt(),
    };
  }

  /**
   * Map a user model to a user entity
   * @param user - The user model to map
   * @returns The user entity
   */
  public static toEntity(user: UserModel): UserEntity {
    return UserEntity.reconstitute(
      new ObjectIdValueObject(user.id),
      user.username,
      new EmailValueObject(user.email),
      new PasswordValueObject(user.password),
      new RoleValueObject(this.toUserRoleEntity(user.role)),
      new ProviderValueObject(user.provider),
      user.avatar_url ? new UrlValueObject(user.avatar_url) : null,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }
}
