// import dependencies
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import {
  BOOK_REPOSITORY_TOKEN,
  type IBookRepository,
} from "@/modules/reading/domain/repositories/book.repository";
import { Inject } from "@nestjs/common";
import { QueryBase } from "@/shared/domain/queries/base.query";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";

/**
 * Find all books use case
 * @description Find all books use case which is used to find all books.
 */
export class FindAllBooksUseCase {
  /**
   * Constructor for FindAllBooksUseCase
   * @param bookRepository - The book repository
   */
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
  ) {}

  /**
   * Execute the find all books use case
   * @param field - The field to filter by
   * @param value - The value to filter by
   * @param limit - The limit to query
   * @param page - The page to query
   * @param sort - The sort to query
   * @param order - The order to query
   * @returns The books and the total count of the books
   */
  public async execute(
    field?: string,
    value?: string,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: BookEntity[]; totalCount: number }> {
    let filters: Filters = [];

    /**
     * if the key is provided then the filter will be [field=value]
     * if the key is not provided then it will use default filters
     * default filters:  [title/author/ISBN10/ISBN13 CONTAINS value] and connected with OR logic
     */
    if (value) {
      if (field) {
        filters.push({
          field: field,
          operator: FilterOperator.EQUALS,
          value: value,
        });
      } else {
        filters = [
          {
            field: "title",
            operator: FilterOperator.CONTAINS,
            value: value,
          },
          {
            field: "author",
            operator: FilterOperator.CONTAINS,
            value: value,
          },
          {
            field: "ISBN10",
            operator: FilterOperator.CONTAINS,
            value: value,
          },
          {
            field: "ISBN13",
            operator: FilterOperator.CONTAINS,
            value: value,
          },
        ];
      }
    }

    // build the query object
    const query: QueryBase = new QueryBase(
      filters,
      FilterLogic.OR,
      limit,
      page,
      sort,
      order,
    );

    // find all books
    const { data, totalCount } = await this.bookRepository.findAll(query);

    // return the books and the total count of the books
    return { data, totalCount };
  }
}
