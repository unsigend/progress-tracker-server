// import dependencies

/**
 * Normal query class
 * @description Normal query abstract base class
 */
export class NormalQuery {
  private readonly key: string | null;
  private readonly value: string | null;
  private readonly sort: string;
  private readonly order: "asc" | "desc";
  private readonly limit: number;
  private readonly page: number;

  // private constants
  private readonly DEFAULT_SORT = "createdAt";
  private readonly DEFAULT_ORDER = "desc";
  private readonly DEFAULT_LIMIT = 10;
  private readonly DEFAULT_PAGE = 1;

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
    this.key = key ?? null;
    this.value = value ?? null;
    this.sort = sort ?? this.DEFAULT_SORT;
    this.order = order ?? this.DEFAULT_ORDER;
    this.limit = limit ?? this.DEFAULT_LIMIT;
    this.page = page ?? this.DEFAULT_PAGE;
  }

  /**
   * Get the key of the query
   * @returns The key of the query
   */
  getKey(): string | null {
    return this.key;
  }

  /**
   * Get the value of the query
   * @returns The value of the query
   */
  getValue(): string | null {
    return this.value;
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
