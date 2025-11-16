import { Injectable } from "@nestjs/common";
import { type IUserBookRepository } from "@/modules/reading/domain/repositories/user-book.repository";
import { USER_BOOK_REPOSITORY_TOKEN } from "@/modules/reading/domain/repositories/user-book.repository";
import { Inject } from "@nestjs/common";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { UserBookEntity } from "@/modules/reading/domain/entities/user-book.entity";
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import { UserBookMapper } from "@/modules/reading/infrastructure/mapper/user-book.mapper";

/**
 * Find all user books with book use case
 * @description Find all user books with book use case which is used to find all user books with book.
 */
@Injectable()
export class FindAllUserBooksWithBookUseCase {
  /**
   * Constructor for FindAllUserBooksWithBookUseCase
   * @param userBookRepository - The user book repository
   */
  constructor(
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the find all user books with book use case
   * @param userId - The user id
   * @param field - The field to query
   * @param value - The value to query
   * @param limit - The limit of the user books
   * @param page - The page of the user books
   * @param sort - The sort of the user books
   * @param order - The order of the user books
   * @returns The user books and the total count of the user books
   */
  public async execute(
    userId: ObjectIdValueObject,
    field?: string,
    value?: string,
    limit?: number,
    page?: number,
    sort?: "createdAt" | "updatedAt" | "completedDate" | "startDate",
    order?: "asc" | "desc",
  ): Promise<{
    data: Array<{ userBook: UserBookEntity; book: BookEntity }>;
    totalCount: number;
  }> {
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
      field: "userId",
      operator: FilterOperator.EQUALS,
      value: userId.getId(),
    });

    // build the query
    const query: QueryBase = new QueryBase(
      filters,
      FilterLogic.AND,
      limit,
      page,
      sort ? UserBookMapper.toSort(sort) : undefined,
      order,
    );

    // find all user books with book
    const { data, totalCount } =
      await this.userBookRepository.findAllWithBook(query);

    // return the user books and the total count of the user books
    return { data, totalCount };
  }
}
