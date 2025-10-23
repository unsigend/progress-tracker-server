// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { PageValueObject } from "@domain/value-objects/book/page.vo";
import { ISBNValueObject } from "@domain/value-objects/book/isbn.vo";
import { UrlValueObject } from "@domain/value-objects/common/url.vo";

/**
 * Book entity
 * @description Book entity
 */
export class BookEntity {
  // required fields
  private readonly id: ObjectIdValueObject;
  private title: string;
  private pages: PageValueObject;
  private readonly createdById: ObjectIdValueObject;

  // optional fields
  private author: string | null;
  private description: string | null;
  private isbn10: ISBNValueObject | null;
  private isbn13: ISBNValueObject | null;
  private coverUrl: UrlValueObject | null;
  private createdAt: Date | null;
  private updatedAt: Date | null;

  /**
   * Private constructor used by the factory methods
   */
  private constructor(
    id: ObjectIdValueObject,
    title: string,
    pages: PageValueObject,
    createdById: ObjectIdValueObject,
    author?: string | null,
    description?: string | null,
    isbn10?: ISBNValueObject | null,
    isbn13?: ISBNValueObject | null,
    coverUrl?: UrlValueObject | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
  ) {
    this.id = id;
    this.title = title;
    this.pages = pages;
    this.createdById = createdById;
    this.author = author ?? null;
    this.description = description ?? null;
    this.isbn10 = isbn10 ?? null;
    this.isbn13 = isbn13 ?? null;
    this.coverUrl = coverUrl ?? null;
    this.createdAt = createdAt ?? null;
    this.updatedAt = updatedAt ?? null;
  }

  /**
   * Factory method to create a new book entity
   * @description Create a new book entity
   */
  public static create(
    title: string,
    pages: PageValueObject,
    createdById: ObjectIdValueObject,
    author?: string | null,
    description?: string | null,
    isbn10?: ISBNValueObject | null,
    isbn13?: ISBNValueObject | null,
    coverUrl?: UrlValueObject | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
  ): BookEntity {
    return new BookEntity(
      new ObjectIdValueObject(),
      title,
      pages,
      createdById,
      author,
      description,
      isbn10 ?? null,
      isbn13 ?? null,
      coverUrl ?? null,
      createdAt ?? new Date(),
      updatedAt ?? new Date(),
    );
  }

  /**
   * Factory method to reconstitute a book entity
   * @description Reconstitute a book entity
   */
  public static reconstitute(
    id: ObjectIdValueObject,
    title: string,
    pages: PageValueObject,
    createdById: ObjectIdValueObject,
    author?: string | null,
    description?: string | null,
    isbn10?: ISBNValueObject | null,
    isbn13?: ISBNValueObject | null,
    coverUrl?: UrlValueObject | null,
    createdAt?: Date,
    updatedAt?: Date,
  ): BookEntity {
    return new BookEntity(
      id,
      title,
      pages,
      createdById,
      author ?? null,
      description ?? null,
      isbn10 ?? null,
      isbn13 ?? null,
      coverUrl ?? null,
      createdAt ?? new Date(),
      updatedAt ?? new Date(),
    );
  }

  /**
   * Get the id of the book
   * @returns The id of the book
   */
  public getId(): ObjectIdValueObject {
    return this.id;
  }

  /**
   * Get the title of the book
   * @returns The title of the book
   */
  public getTitle(): string {
    return this.title;
  }

  /**
   * Get the pages of the book
   * @returns The pages of the book
   */
  public getPages(): PageValueObject {
    return this.pages;
  }

  /**
   * Get the created by id of the book
   * @returns The created by id of the book
   */
  public getCreatedById(): ObjectIdValueObject {
    return this.createdById;
  }

  /**
   * Get the author of the book
   * @returns The author of the book
   */
  public getAuthor(): string | null {
    return this.author;
  }

  /**
   * Get the description of the book
   * @returns The description of the book
   */
  public getDescription(): string | null {
    return this.description;
  }

  /**
   * Get the ISBN-10 of the book
   * @returns The ISBN-10 of the book
   */
  public getISBN10(): ISBNValueObject | null {
    return this.isbn10;
  }

  /**
   * Get the ISBN-13 of the book
   * @returns The ISBN-13 of the book
   */
  public getISBN13(): ISBNValueObject | null {
    return this.isbn13;
  }

  /**
   * Get the cover url of the book
   * @returns The cover url of the book
   */
  public getCoverUrl(): UrlValueObject | null {
    return this.coverUrl;
  }

  /**
   * Get the created at date of the book
   * @returns The created at date of the book
   */
  public getCreatedAt(): Date | null {
    return this.createdAt;
  }

  /**
   * Get the updated at date of the book
   * @returns The updated at date of the book
   */
  public getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  /**
   * Set the title of the book
   * @param title - The title of the book
   */
  public setTitle(title: string): void {
    this.title = title;
    this.updatedAt = new Date();
  }

  /**
   * Set the pages of the book
   * @param pages - The pages of the book
   */
  public setPages(pages: PageValueObject): void {
    this.pages = pages;
    this.updatedAt = new Date();
  }

  /**
   * Set the author of the book
   * @param author - The author of the book
   */
  public setAuthor(author: string): void {
    this.author = author;
    this.updatedAt = new Date();
  }

  /**
   * Set the description of the book
   * @param description - The description of the book
   */
  public setDescription(description: string): void {
    this.description = description;
    this.updatedAt = new Date();
  }

  /**
   * Set the ISBN-10 of the book
   * @param isbn10 - The ISBN-10 of the book
   */
  public setISBN10(isbn10: ISBNValueObject): void {
    this.isbn10 = isbn10;
    this.updatedAt = new Date();
  }

  /**
   * Set the ISBN-13 of the book
   * @param isbn13 - The ISBN-13 of the book
   */
  public setISBN13(isbn13: ISBNValueObject): void {
    this.isbn13 = isbn13;
    this.updatedAt = new Date();
  }

  /**
   * Set the cover url of the book
   * @param coverUrl - The cover url of the book
   */
  public setCoverUrl(coverUrl: UrlValueObject): void {
    this.coverUrl = coverUrl;
    this.updatedAt = new Date();
  }

  /**
   * Set the created at date of the book
   * @param createdAt - The created at date of the book
   */
  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
    this.updatedAt = new Date();
  }

  /**
   * Set the updated at date of the book
   * @param updatedAt - The updated at date of the book
   */
  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  /**
   * Delete the book
   */
  public delete(): void {
    // Soft delete here nothing to do
    // Just keep API consistency
    return;
  }
}
