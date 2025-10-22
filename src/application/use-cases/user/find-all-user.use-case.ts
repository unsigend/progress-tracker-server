// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import entities
import { UserEntity } from "@domain/entities/user.entity";

// import interfaces
import type { IUserRepository } from "@domain/repositories/user.repository";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";

// import queries
import { UserQuery } from "@domain/repositories/queries/user.query";

/**
 * Find all users use case
 * @description Find all users use case
 */
@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Execute the find all users use case
   * @description Execute the find all users use case
   * @param query - The query to be used to find the users
   * @returns The users and total count
   */
  async execute(
    query: UserQuery,
  ): Promise<{ users: UserEntity[]; totalCount: number }> {
    const { users, totalCount } = await this.userRepository.findAll(query);
    return { users, totalCount };
  }
}
