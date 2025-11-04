// import dependencies
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import { ISBNValueObject } from "@/modules/reading/domain/object-value/isbn.vo";
import { PagesValueObject } from "@/modules/reading/domain/object-value/pages.vo";
import { ImageValueObject } from "@/shared/domain/value-object/image.vo";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { Inject } from "@nestjs/common";
import { ConflictException } from "@/shared/domain/exceptions/conflict.exception";
import {
  BOOK_REPOSITORY_TOKEN,
  type IBookRepository,
} from "@/modules/reading/domain/repositories/book.repository";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";
import {
  IMAGE_COMPRESSOR_TOKEN,
  type IImageCompress,
} from "@shared/domain/services/image-compress.service";
import { PERMISSION_POLICY_TOKEN } from "@shared/domain/services/permission-policy.service";
import type { IPermissionPolicy } from "@shared/domain/services/permission-policy.service";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { PermissionException } from "@/shared/domain/exceptions/permission.exception";

/**
 * Create book use case
 * @description Create book use case which is used to create a new book.
 */
export class CreateBookUseCase {
  /**
   * Constructor for CreateBookUseCase
   * @param bookRepository - The book repository
   */
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
    @Inject(PERMISSION_POLICY_TOKEN)
    private readonly permissionPolicy: IPermissionPolicy<BookEntity>,
  ) {}

  /**
   * Execute the create book use case
   * @param book - The book to create
   * @returns The created book
   */
  public async execute(
    user: UserEntity,
    title: string,
    pages: PagesValueObject,
    createdById: ObjectIdValueObject,
    author?: string | null,
    description?: string | null,
    isbn10?: ISBNValueObject | null,
    isbn13?: ISBNValueObject | null,
    coverImage?: ImageValueObject | null,
  ): Promise<BookEntity> {
    // permission check
    if (!(await this.permissionPolicy.canModifyCollection(user))) {
      throw new PermissionException("Permission denied");
    }

    // check if the book with ISBN10 exists
    if (isbn10) {
      const existingBook: BookEntity | null =
        await this.bookRepository.findByISBN10(isbn10.getISBN());
      if (existingBook) {
        throw new ConflictException("Book with ISBN10 already exists");
      }
    }

    // check if the book with ISBN13 exists
    if (isbn13) {
      const existingBook: BookEntity | null =
        await this.bookRepository.findByISBN13(isbn13.getISBN());
      if (existingBook) {
        throw new ConflictException("Book with ISBN13 already exists");
      }
    }

    // if the cover image is provided
    let coverUrl: UrlValueObject | null = null;

    if (coverImage) {
      // compress the cover image
      const compressedCover: ImageValueObject =
        await this.imageCompressor.compressImage(coverImage);

      // upload the compressed cover to the cloud
      coverUrl = await this.cloudService.upload(compressedCover);
    }

    // create the book entity
    const bookEntity: BookEntity = BookEntity.create(
      title,
      pages,
      createdById,
      author,
      description,
      isbn10,
      isbn13,
      coverUrl,
    );

    // save the book entity
    await this.bookRepository.save(bookEntity);

    // return the book entity
    return bookEntity;
  }
}
