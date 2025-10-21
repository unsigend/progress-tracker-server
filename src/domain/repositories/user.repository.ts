// import entities
import { UserEntity } from "@domain/entities/user.entity";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { UsernameValueObject } from "@domain/value-objects/user/username.vo";

// import queries
import { UserQuery } from "@domain/repositories/queries/user.query";

/**
 * User repository interface
 * @description User repository interface
 */
export interface IUserRepository {
  /**
   * Save a user updates or creates a new user
   * @description Save a user
   * @param user - The user to be saved
   */
  save(user: UserEntity): Promise<void>;

  /**
   * Find a user by id
   * @description Find a user by id
   * @param id - The id of the user to be found
   * @returns The user or null if not found
   */
  findById(id: ObjectIdValueObject): Promise<UserEntity | null>;

  /**
   * Find a user by email
   * @description Find a user by email
   * @param email - The email of the user to be found
   * @returns The user or null if not found
   */
  findByEmail(email: EmailValueObject): Promise<UserEntity | null>;

  /**
   * Find a user by username
   * @description Find a user by username
   * @param username - The username of the user to be found
   * @returns The user or null if not found
   */
  findByUsername(username: UsernameValueObject): Promise<UserEntity | null>;

  /**
   * Find all users
   * @description Find all users
   * @param query - The query to be used to find the users
   * @returns All users
   */
  findAll(query: UserQuery): Promise<UserEntity[]>;

  /**
   * Delete a user
   * @description Delete a user
   * @param id - The id of the user to be deleted
   */
  delete(id: ObjectIdValueObject): Promise<void>;
}
