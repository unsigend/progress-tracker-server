// import dependencies
import { ValidationException } from "@shared/domain/exceptions/validation.exception";

/**
 * Pages value object
 * @description Pages value object which is used to store the pages of the book.
 */
export class PagesValueObject {
  // private properties
  private readonly pages: number;

  /**
   * Constructor for PagesValueObject
   * @param pages - The pages of the object
   * @throws ValidationException if the pages is not a valid number
   */
  constructor(pages: number) {
    if (pages < 0) {
      throw new ValidationException("Pages must be greater than 0");
    }
    if (pages > 5000) {
      throw new ValidationException("Pages must be less than 5000");
    }
    this.pages = pages;
  }

  /**
   * Get the pages
   * @returns The pages
   */
  public getPages(): number {
    return this.pages;
  }
}
