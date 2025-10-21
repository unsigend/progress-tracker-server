// important models
import { User as UserModel, UserRole as UserRoleModel } from "@prisma/client";

// important entities
import { UserEntity, UserRole } from "@/domain/entities/user.entity";

// important value objects
import { ObjectIdValueObject } from "@/domain/value-objects/common/object-id.vo";
import { UsernameValueObject } from "@/domain/value-objects/user/username.vo";
import { EmailValueObject } from "@/domain/value-objects/user/email.vo";
import { PasswordValueObject } from "@/domain/value-objects/user/password.vo";
import { ProviderValueObject } from "@/domain/value-objects/user/provider.vo";
import { RoleValueObject } from "@/domain/value-objects/user/role.vo";
import { UrlValueObject } from "@/domain/value-objects/common/url.vo";

/*
 * User mapper
 * @description User mapper
 */
export class UserMapper {
  /**
   * Map a user role entity to a user role model
   * @param role - The user role entity to be mapped
   * @returns The user role model
   */
  private static toUserRoleModel(role: UserRole): UserRoleModel {
    switch (role) {
      case UserRole.ADMIN:
        return UserRoleModel.ADMIN;
      case UserRole.USER:
        return UserRoleModel.USER;
    }
  }

  /**
   * Map a user role model to a user role entity
   * @param role - The user role model to be mapped
   * @returns The user role entity
   */
  private static toUserRoleEntity(role: UserRoleModel): UserRole {
    switch (role) {
      case UserRoleModel.ADMIN:
        return UserRole.ADMIN;
      case UserRoleModel.USER:
        return UserRole.USER;
    }
  }
  /**
   * Map a user entity to a user model
   * @param user - The user entity to be mapped
   * @returns The user model
   */
  public static toModel(user: UserEntity): UserModel {
    return {
      id: user.getId()!.getValue(),
      username: user.getUsername()!.getValue(),
      email: user.getEmail()!.getValue(),
      password: user.getPassword()!.getValue(),
      avatar_url: user.getAvatarUrl()?.getValue() ?? null,
      provider: user.getProvider()!.getValue(),
      role: this.toUserRoleModel(user.getRole()!.getValue()),
      createdAt: user.getCreatedAt()!,
      updatedAt: user.getUpdatedAt()!,
      deletedAt: user.getDeletedAt(),
    };
  }

  /**
   * Map a user model to a user entity
   * @param user - The user model to be mapped
   * @returns The user entity
   */
  public static toEntity(user: UserModel): UserEntity {
    return UserEntity.reconstitute(
      new ObjectIdValueObject(user.id),
      new UsernameValueObject(user.username),
      new EmailValueObject(user.email),
      new PasswordValueObject(user.password),
      new ProviderValueObject(user.provider),
      new RoleValueObject(this.toUserRoleEntity(user.role)),
      user.createdAt,
      user.updatedAt,
      user.deletedAt ?? null,
      user.avatar_url ? new UrlValueObject(user.avatar_url) : null,
    );
  }
}
