// Role value object

// import dependencies
import { UserRoleEnum } from "@domain/entities/user.entity";

// import exceptions
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Role value object
 * @description This value object is used to validate and store the role
 */
export class RoleValueObject {
  private readonly role: UserRoleEnum;

  /**
   * Create a new role value object
   * @param role - The role to create the value object for
   * @throws {ValidationException} - If the role is invalid
   */
  constructor(role: UserRoleEnum) {
    if (!Object.values(UserRoleEnum).includes(role)) {
      throw new ValidationException("Invalid user role");
    }
    this.role = role;
  }

  /**
   * Get the value of the role
   * @returns The role
   */
  getValue(): UserRoleEnum {
    return this.role;
  }

  /**
   * Get the string representation of the role
   * @returns The role
   */
  toString(): string {
    return this.role;
  }

  /**
   * Check if the role is admin
   * @returns True if the role is admin, false otherwise
   */
  isAdmin(): boolean {
    return this.role === UserRoleEnum.ADMIN;
  }

  /**
   * Check if the role is user
   * @returns True if the role is user, false otherwise
   */
  isUser(): boolean {
    return this.role === UserRoleEnum.USER;
  }
}
