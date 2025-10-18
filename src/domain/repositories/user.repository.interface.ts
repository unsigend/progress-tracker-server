// User Repository Interface

import { User } from "@/domain/entities/user.entity";

/**
 * User Query
 * @param key - The key to filter users by
 * @param value - The value to filter users by
 * @param page - The page number
 * @param limit - The number of results per page
 * @param sort - The field to sort by
 * @param order - The order to sort by
 */
export interface UserQueryInterface {
  key?: string;
  value?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface UserRepositoryInterface {
  /**
   * Create a user
   * @param user - The user to create
   * @returns The created user
   */
  create(user: User): Promise<User>;

  /**
   * Find all users
   * @param query - The query
   * @returns The users and the total number of users
   */
  findAll(
    query?: UserQueryInterface,
  ): Promise<{ users: User[]; totalCount: number }>;

  /**
   * Find a user by id
   * @param id - The id of the user
   * @returns The user or null if the user is not found
   */
  findById(id: string): Promise<User | null>;

  /**
   * Update a user
   * @param user - The user to update
   * @returns The updated user or null if the user is not found
   */
  update(user: User): Promise<User | null>;

  /**
   * Delete a user
   * @param id - The id of the user
   * @returns The deleted user or null if the user is not found
   */
  delete(id: string): Promise<User | null>;
}
