// import dependencies
import { ValidationException } from "@shared/domain/exceptions/validation.exception";
import { UserRole } from "../entities/user.entity";

/**
 * Role value object
 * @description Role value object which is used to store the role.
 */
export class RoleValueObject {
  // private properties
  private readonly role: UserRole;

  /**
   * Constructor for RoleValueObject
   * @param role - The role of the object
   * @throws ValidationException if the role is not a valid role
   */
  constructor(role: UserRole) {
    if (!Object.values(UserRole).includes(role)) {
      throw new ValidationException("Invalid role");
    }
    this.role = role;
  }

  /**
   * Get the role
   * @returns The role
   */
  public getRole(): UserRole {
    return this.role;
  }

  /**
   * Check if the role is admin
   * @returns True if the role is admin, false otherwise
   */
  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }
}
