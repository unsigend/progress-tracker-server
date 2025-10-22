// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Page value object
 * @description Page value object
 */
export class PageValueObject {
  private readonly page: number;
  private readonly MIN_PAGE = 1 as const;
  private readonly MAX_PAGE = 3000 as const;

  /**
   * Constructor
   * @param page - The page to be validated
   */
  constructor(page: number) {
    if (!page) {
      throw new ValidationException("Page is required");
    }
    if (page < this.MIN_PAGE) {
      throw new ValidationException(
        `Page must be greater than ${this.MIN_PAGE}`,
      );
    }
    if (page > this.MAX_PAGE) {
      throw new ValidationException(`Page must be less than ${this.MAX_PAGE}`);
    }
    this.page = page;
  }

  /**
   * Get the value of the page
   * @returns The value of the page
   */
  public getValue(): number {
    return this.page;
  }

  /**
   * Check if the page is equal to another page
   * @param other - The other page to compare
   * @returns True if the page is equal to another page, false otherwise
   */
  public equals(other: PageValueObject): boolean {
    return this.page === other.getValue();
  }
}
