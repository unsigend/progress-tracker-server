import { Filters, FilterLogic } from "./filter";

/**
 * Abstract base query class
 * @description Abstract base query class
 */
export class QueryBase {
  private readonly filters: Filters;
  private readonly connection: FilterLogic;
  private readonly limit: number;
  private readonly page: number;
  private readonly sort: string;
  private readonly order: "asc" | "desc";

  private readonly DEFAULT_LIMIT: number = 10 as const;
  private readonly DEFAULT_PAGE: number = 1 as const;
  private readonly DEFAULT_SORT: string = "createdAt" as const;
  private readonly DEFAULT_ORDER: "asc" | "desc" = "desc" as const;

  /**
   * Constructor for BaseQuery
   * @param key - The key to query
   * @param value - The value to query
   * @param limit - The limit to query
   * @param page - The page to query
   * @param sort - The sort to query
   * @param order - The order to query
   */
  constructor(
    filters: Filters = [],
    connection: FilterLogic = FilterLogic.AND,
    limit: number = this.DEFAULT_LIMIT,
    page: number = this.DEFAULT_PAGE,
    sort: string = this.DEFAULT_SORT,
    order: "asc" | "desc" = this.DEFAULT_ORDER,
  ) {
    this.filters = filters;
    this.connection = connection;
    this.limit = limit ?? this.DEFAULT_LIMIT;
    this.page = page ?? this.DEFAULT_PAGE;
    this.sort = sort ?? this.DEFAULT_SORT;
    this.order = order ?? this.DEFAULT_ORDER;
  }

  /**
   * Get the key
   * @returns The key
   */
  public getFilters(): Filters {
    return this.filters;
  }

  /**
   * Get the connection
   * @returns The connection
   */
  public getConnection(): FilterLogic {
    return this.connection;
  }

  /**
   * Get the limit
   * @returns The limit
   */
  public getLimit(): number {
    return this.limit;
  }

  /**
   * Get the page
   * @returns The page
   */
  public getPage(): number {
    return this.page;
  }

  /**
   * Get the sort
   * @returns The sort
   */
  public getSort(): string {
    return this.sort;
  }

  /**
   * Get the order
   * @returns The order
   */
  public getOrder(): "asc" | "desc" {
    return this.order;
  }
}
