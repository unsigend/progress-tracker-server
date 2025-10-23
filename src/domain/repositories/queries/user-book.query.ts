// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

// import base query class
import { NormalQuery } from "@domain/repositories/queries/normal.query";

/**
 * User book query class
 * @description User book query class
 */
export class UserBookQuery extends NormalQuery {
  private readonly userId: ObjectIdValueObject | null;
  private readonly bookId: ObjectIdValueObject | null;

  constructor(
    userId?: ObjectIdValueObject,
    bookId?: ObjectIdValueObject,
    key?: string,
    value?: string,
    sort?: string,
    order?: "asc" | "desc",
    limit?: number,
    page?: number,
  ) {
    super(key, value, sort, order, limit, page);
    this.userId = userId ?? null;
    this.bookId = bookId ?? null;
  }

  /**
   * Get the user id of the query
   * @returns The user id of the query
   */
  getUserId(): ObjectIdValueObject | null {
    return this.userId;
  }

  /**
   * Get the book id of the query
   * @returns The book id of the query
   */
  getBookId(): ObjectIdValueObject | null {
    return this.bookId;
  }
}
