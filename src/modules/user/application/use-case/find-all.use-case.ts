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
import { PERMISSION_POLICY_TOKEN } from "@shared/domain/services/permission-policy.service";
import type { IPermissionPolicy } from "@shared/domain/services/permission-policy.service";
import { PermissionException } from "@shared/domain/exceptions/permission.exception";
/**
 * Find all users use case
 * @description Find all users use case which is used to find all users.
 */
export class FindAllUsersUseCase {
  /**
   * Constructor for FindAllUsersUseCase
   * @param userRepository - The user repository
   * @param permissionPolicy - The permission policy
   */
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PERMISSION_POLICY_TOKEN)
    private readonly permissionPolicy: IPermissionPolicy<UserEntity>,
  ) {}

  /**
   * Execute the find all users use case
   * @param user - The user requesting the find all users
   * @param field - The field to filter the users
   * @param value - The value to filter the users
   * @param limit - The limit of the users
   * @param page - The page of the users
   * @param sort - The sort of the users
   * @param order - The order of the users
   * @returns The users
   */
  public async execute(
    user: UserEntity,
    field?: string,
    value?: string,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: UserEntity[]; totalCount: number }> {
    // permission check
    if (!(await this.permissionPolicy.canAccessCollection(user))) {
      throw new PermissionException("Permission denied");
    }

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
