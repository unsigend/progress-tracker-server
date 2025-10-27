// import dependencies
import { UserEntity } from "../../domain/entities/user.entity";
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "../../domain/repositories/user.repository";
import { QueryBase } from "@shared/domain/queries/base.query";
import { Inject } from "@nestjs/common";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";

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
    field?: string,
    value?: string,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: UserEntity[]; totalCount: number }> {
    const filters: Filters = [];
    if (field && value) {
      filters.push({
        field: field,
        operator: FilterOperator.EQUALS,
        value: value,
      });
    }
    // build the query object
    const query: QueryBase = new QueryBase(
      filters,
      FilterLogic.AND,
      limit,
      page,
      sort,
      order,
    );

    // find all users
    const { data, totalCount } = await this.userRepository.findAll(query);

    // return the users
    return { data, totalCount };
  }
}
