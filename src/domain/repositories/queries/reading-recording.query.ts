// import value objects
import { ObjectIdValueObject } from "@/domain/value-objects/common/object-id.vo";

/**
 * Reading recording query
 * @description Reading recording query
 */
export class ReadingRecordingQuery {
  private readonly userBookId: ObjectIdValueObject | null;
  private readonly date: Date | null;

  private readonly sort: string;
  private readonly order: "asc" | "desc";
  private readonly limit: number;
  private readonly page: number;

  private readonly DEFAULT_SORT = "createdAt";
  private readonly DEFAULT_ORDER = "desc";
  private readonly DEFAULT_LIMIT = 10;
  private readonly DEFAULT_PAGE = 1;

  constructor(
    userBookId?: ObjectIdValueObject | null,
    date?: Date | null,
    sort?: string | null,
    order?: "asc" | "desc" | null,
    limit?: number | null,
    page?: number | null,
  ) {
    this.userBookId = userBookId ?? null;
    this.date = date ?? null;
    this.sort = sort ?? this.DEFAULT_SORT;
    this.order = order ?? this.DEFAULT_ORDER;
    this.limit = limit ?? this.DEFAULT_LIMIT;
    this.page = page ?? this.DEFAULT_PAGE;
  }

  /**
   * Get the user book id of the query
   * @returns The user book id of the query
   */
  getUserBookId(): ObjectIdValueObject | null {
    return this.userBookId;
  }

  /**
   * Get the date of the query
   * @returns The date of the query
   */
  getDate(): Date | null {
    return this.date;
  }

  /**
   * Get the sort of the query
   * @returns The sort of the query
   */
  getSort(): string {
    return this.sort;
  }

  /**
   * Get the order of the query
   * @returns The order of the query
   */
  getOrder(): "asc" | "desc" {
    return this.order;
  }

  /**
   * Get the limit of the query
   * @returns The limit of the query
   */
  getLimit(): number {
    return this.limit;
  }

  /**
   * Get the page of the query
   * @returns The page of the query
   */
  getPage(): number {
    return this.page;
  }
}
