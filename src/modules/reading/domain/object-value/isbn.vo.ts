// import dependencies
import { ValidationException } from "@shared/domain/exceptions/validation.exception";
import { isISBN } from "class-validator";

/**
 * ISBN value object
 * @description ISBN value object which is used to store the ISBN of the book.
 */
export class ISBNValueObject {
  // private properties
  private readonly isbn: string;

  /**
   * Constructor for ISBNValueObject
   * @param value - The ISBN of the object
   * @throws ValidationException if the ISBN is not a valid ISBN
   */
  constructor(value: string) {
    if (!value?.trim()) {
      throw new ValidationException("ISBN is required");
    }
    if (!isISBN(value, "10") && !isISBN(value, "13")) {
      throw new ValidationException("Invalid ISBN");
    }
    this.isbn = value.trim();
  }

  /**
   * Get the ISBN
   * @returns The ISBN
   */
  public getISBN(): string {
    return this.isbn;
  }

  /**
   * Check if the ISBN is a valid ISBN10
   * @returns True if the ISBN is a valid ISBN10, false otherwise
   */
  public isISBN10(): boolean {
    return isISBN(this.isbn, "10");
  }

  /**
   * Check if the ISBN is a valid ISBN13
   * @returns True if the ISBN is a valid ISBN13, false otherwise
   */
  public isISBN13(): boolean {
    return isISBN(this.isbn, "13");
  }
}
