// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * ISBN value object
 * @description ISBN value object
 */
export class ISBNValueObject {
  private readonly isbn: string;
  private readonly normalizedIsbn: string;

  /**
   * Constructor
   * @param isbn - The ISBN to be validated
   */
  constructor(isbn: string) {
    if (!isbn) {
      throw new ValidationException("ISBN is required");
    }
    const trimmedIsbn = isbn.trim();
    if (trimmedIsbn === "") {
      throw new ValidationException("ISBN is required");
    }
    // normalize the ISBN by removing the dashes
    const normalizedIsbn = trimmedIsbn.replace(/-/g, "");
    this.isbn = trimmedIsbn;
    this.normalizedIsbn = normalizedIsbn;
  }

  /**
   * Get the value of the ISBN
   * @returns The value of the ISBN
   */
  public getValue(): string {
    return this.isbn;
  }

  /**
   * Check if the ISBN is equal to another ISBN
   * @param other - The other ISBN to compare
   * @returns True if the ISBN is equal to another ISBN, false otherwise
   */
  public equals(other: ISBNValueObject): boolean {
    return this.isbn === other.getValue();
  }

  /**
   * Check if the ISBN is a valid ISBN-10
   * @returns True if the ISBN is a valid ISBN-10, false otherwise
   */
  public isISBN10(): boolean {
    return this.normalizedIsbn.length === 10;
  }

  /**
   * Check if the ISBN is a valid ISBN-13
   * @returns True if the ISBN is a valid ISBN-13, false otherwise
   */
  public isISBN13(): boolean {
    return this.normalizedIsbn.length === 13;
  }

  /**
   * Check if the ISBN is a valid ISBN
   * @returns True if the ISBN is a valid ISBN, false otherwise
   */
  public isValid(): boolean {
    return this.isISBN10() || this.isISBN13();
  }
}
