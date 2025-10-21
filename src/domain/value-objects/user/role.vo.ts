// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";
import { UserRole } from "@domain/entities/user.entity";

/**
 * Role value object
 * @description Role value object
 */
export class RoleValueObject {
  private readonly role: UserRole;

  /**
   * Constructor
   * @param role - The role to be validated
   */
  constructor(role: UserRole) {
    if (!role) {
      throw new ValidationException("Role is required");
    }
    this.role = role;
  }

  /**
   * Get the value of the role
   * @returns The value of the role
   */
  public getValue(): UserRole {
    return this.role;
  }

  /**
   * Check if the role is equal to another role
   * @param other - The other role to compare
   * @returns True if the role is equal to another role, false otherwise
   */
  public equals(other: RoleValueObject): boolean {
    return this.role === other.getValue();
  }

  /**
   * Check if the role is admin
   * @returns True if the role is admin, false otherwise
   */
  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  /**
   * Check if the role is user
   * @returns True if the role is user, false otherwise
   */
  public isUser(): boolean {
    return this.role === UserRole.USER;
  }
}
