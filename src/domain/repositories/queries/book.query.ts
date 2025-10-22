// import dependencies
import { NormalQuery } from "@domain/repositories/queries/normal.query";

/**
 * Book query class
 * @description Book query class
 */
export class BookQuery extends NormalQuery {
  /**
   * Constructor
   * @param key - The key of the query
   * @param value - The value of the query
   * @param sort - The sort of the query
   * @param order - The order of the query
   * @param limit - The limit of the query
   * @param page - The page of the query
   */
  constructor(
    key?: string,
    value?: string,
    sort?: string,
    order?: "asc" | "desc",
    limit?: number,
    page?: number,
  ) {
    super(key, value, sort, order, limit, page);
  }
}
