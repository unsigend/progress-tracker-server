// import dependencies
import { UserEntity } from "../../domain/entities/user.entity";
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "../../domain/repositories/user.repository";
import { QueryBase } from "@shared/domain/queries/base.query";
import { Inject } from "@nestjs/common";

/**
 * Find all users use case
 * @description Find all users use case which is used to find all users.
 */
export class FindAllUsersUseCase {
  /**
   * Constructor for FindAllUsersUseCase
   * @param userRepository - The user repository
   */
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Execute the find all users use case
   * @param query - The query to find the users
   * @returns The users
   */
  public async execute(
    query: QueryBase,
  ): Promise<{ data: UserEntity[]; totalCount: number }> {
    // find all users
    const { data, totalCount } = await this.userRepository.findAll(query);

    // return the users
    return { data, totalCount };
  }
}
