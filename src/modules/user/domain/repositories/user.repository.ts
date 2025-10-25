// import dependencies
import { UserEntity } from "../entities/user.entity";
import { IBaseRepository } from "@shared/domain/repositories/base.repository";
import { EmailValueObject } from "../value-object/email.vo";

/**
 * User repository token
 * @description User repository token which is used to inject the user repository.
 */
export const USER_REPOSITORY_TOKEN = Symbol("USER_REPOSITORY_TOKEN");

/**
 * User repository interface
 * @description User repository which is used to store the user information.
 */
export interface IUserRepository extends IBaseRepository<UserEntity> {
  /**
   * Find a user by email
   * @param email - The email of the user
   * @returns The user or null if not found
   */
  findByEmail(email: EmailValueObject): Promise<UserEntity | null>;
}
