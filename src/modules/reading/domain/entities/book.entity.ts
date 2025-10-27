import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { ISBNValueObject } from "../object-value/isbn.vo";
import { PagesValueObject } from "../object-value/pages.vo";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";

/**
 * Book entity
 * @description Book entity which is used to store the book information.
 */
export class BookEntity {
  // required properties
  private readonly id: ObjectIdValueObject;
  private title: string;
  private pages: PagesValueObject;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private readonly createdById: ObjectIdValueObject;

  // optional properties
  private author: string | null;
  private description: string | null;
  private isbn10: ISBNValueObject | null;
  private isbn13: ISBNValueObject | null;
  private coverUrl: UrlValueObject | null;

  // private constructor
  private constructor(
    title: string,
    pages: PagesValueObject,
    createdById: ObjectIdValueObject,
    id?: ObjectIdValueObject | null,
    author?: string | null,
    description?: string | null,
    isbn10?: ISBNValueObject | null,
    isbn13?: ISBNValueObject | null,
    coverUrl?: UrlValueObject | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
  ) {
    this.id = id ?? new ObjectIdValueObject();
    this.title = title;
    this.pages = pages;
    this.createdById = createdById;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.author = author ?? null;
    this.description = description ?? null;
    this.isbn10 = isbn10 ?? null;
    this.isbn13 = isbn13 ?? null;
    this.coverUrl = coverUrl ?? null;
  }

  /**
   * Create a new book
   * @param title - The title of the book
   * @param pages - The pages of the book
   * @param createdById - The id of the user who created the book
   * @param author - The author of the book
   * @param description - The description of the book
   * @param isbn10 - The ISBN10 of the book
   * @param isbn13 - The ISBN13 of the book
   * @param coverUrl - The cover url of the book
   * @returns The new book
   */
  public static create(
    title: string,
    pages: PagesValueObject,
    createdById: ObjectIdValueObject,
    author?: string | null,
    description?: string | null,
    isbn10?: ISBNValueObject | null,
    isbn13?: ISBNValueObject | null,
    coverUrl?: UrlValueObject | null,
  ): BookEntity {
    return new BookEntity(
      title,
      pages,
      createdById,
      null,
      author,
      description,
      isbn10,
      isbn13,
      coverUrl,
    );
  }

  /**
   * Reconstitute a book
   * @param id - The id of the book
   * @param title - The title of the book
   * @param pages - The pages of the book
   * @param createdById - The id of the user who created the book
   * @param author - The author of the book
   * @param description - The description of the book
   * @param isbn10 - The ISBN10 of the book
   * @param isbn13 - The ISBN13 of the book
   * @param coverUrl - The cover url of the book
   * @param createdAt - The created at date of the book
   * @param updatedAt - The updated at date of the book
   * @returns The reconstituted book
   */
  public static reconstitute(
    id: ObjectIdValueObject,
    title: string,
    pages: PagesValueObject,
    createdById: ObjectIdValueObject,
    author: string | null,
    description: string | null,
    isbn10: ISBNValueObject | null,
    isbn13: ISBNValueObject | null,
    coverUrl: UrlValueObject | null,
    createdAt: Date,
    updatedAt: Date,
  ): BookEntity {
    return new BookEntity(
      title,
      pages,
      createdById,
      id,
      author,
      description,
      isbn10,
      isbn13,
      coverUrl,
      createdAt,
      updatedAt,
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
  public getPages(): PagesValueObject {
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
   * Get the ISBN10 of the book
   * @returns The ISBN10 of the book
   */
  public getISBN10(): ISBNValueObject | null {
    return this.isbn10;
  }

  /**
   * Get the ISBN13 of the book
   * @returns The ISBN13 of the book
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
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Get the updated at date of the book
   * @returns The updated at date of the book
   */
  public getUpdatedAt(): Date {
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
  public setPages(pages: PagesValueObject): void {
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
   * Set the ISBN10 of the book
   * @param isbn10 - The ISBN10 of the book
   */
  public setISBN10(isbn10: ISBNValueObject): void {
    this.isbn10 = isbn10;
    this.updatedAt = new Date();
  }

  /**
   * Set the ISBN13 of the book
   * @param isbn13 - The ISBN13 of the book
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
}
