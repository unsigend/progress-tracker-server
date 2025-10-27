// import dependencies
import { type IUserBookRepository } from "@/modules/reading/domain/repositories/user-book.repository";
import { Inject, Injectable } from "@nestjs/common";
import { USER_BOOK_REPOSITORY_TOKEN } from "@/modules/reading/domain/repositories/user-book.repository";
import { UserBookEntity } from "@/modules/reading/domain/entities/user-book.entity";
import { QueryBase } from "@/shared/domain/queries/base.query";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
/**
 * Find all user books use case
 * @description Find all user books use case which is used to find all user books.
 */
@Injectable()
export class FindAllUserBooksUseCase {
  /**
   * Constructor for FindAllUserBooksUseCase
   * @param userBookRepository - The user book repository
   */
  constructor(
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the find all user books use case
   * @param query - The query to find the user books
   * @returns The user books
   */
  public async execute(
    userId: ObjectIdValueObject,
    field?: string,
    value?: string,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: UserBookEntity[]; totalCount: number }> {
    // build the filters
    const filters: Filters = [];
    if (field && value) {
      filters.push({
        field: field,
        operator: FilterOperator.EQUALS,
        value: value,
      });
    }

    // always add the constrains for the user id
    filters.push({
      field: "user_id",
      operator: FilterOperator.EQUALS,
      value: userId.getId(),
    });

    // build the query
    const query: QueryBase = new QueryBase(
      filters,
      FilterLogic.AND,
      limit,
      page,
      sort,
      order,
    );

    // find all user books
    const { data, totalCount } = await this.userBookRepository.findAll(query);

    // return the user books and the total count of the user books
    return { data, totalCount };
  }
}
