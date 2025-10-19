// isbn value object

import { ValidationException } from "@domain/exceptions/validation.exception";

export class IsbnValueObject {
  private readonly isbn: string;

  constructor(isbn: string) {
    // validate the isbn
    if (!isbn) {
      throw new ValidationException("ISBN is required");
    }

    // normalize the isbn
    const normalizedIsbn = isbn.toUpperCase().trim();
    // remove hyphens and spaces
    const cleanedIsbn = normalizedIsbn.replace(/[-\s]/g, "");

    // the isbn must be 10 or 13 characters long
    if (cleanedIsbn.length !== 10 && cleanedIsbn.length !== 13) {
      throw new ValidationException("Invalid ISBN length");
    }

    // the isbn must contain only digits and X
    if (!/^[\dX]+$/.test(cleanedIsbn)) {
      throw new ValidationException("ISBN must contain only digits and X");
    }

    this.isbn = cleanedIsbn;
  }

  /**
   * Get the isbn value
   * @returns The isbn value
   */
  getValue(): string {
    return this.isbn;
  }

  /**
   * Get the isbn value as a string
   * @returns The isbn value as a string
   */
  toString(): string {
    return this.isbn;
  }

  /**
   * Check if the isbn is equal to another isbn
   * @param isbn - The isbn to check
   * @returns True if the isbn is equal to the other isbn, false otherwise
   */
  equals(isbn: IsbnValueObject): boolean {
    return this.isbn === isbn.getValue();
  }

  /**
   * Check if the isbn is an ISBN10
   * @returns True if the isbn is an ISBN10, false otherwise
   */
  isISBN10(): boolean {
    return this.isbn.length === 10;
  }

  /**
   * Check if the isbn is an ISBN13
   * @returns True if the isbn is an ISBN13, false otherwise
   */
  isISBN13(): boolean {
    return this.isbn.length === 13;
  }

  /**
   * Check if the isbn is an ISBN
   * @returns True if the isbn is an ISBN, false otherwise
   */
  isISBN(): boolean {
    return this.isISBN10() || this.isISBN13();
  }
}
