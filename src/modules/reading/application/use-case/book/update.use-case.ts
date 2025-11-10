import { PagesValueObject } from "@/modules/reading/domain/object-value/pages.vo";
import {
  BOOK_REPOSITORY_TOKEN,
  type IBookRepository,
} from "@/modules/reading/domain/repositories/book.repository";
import { Inject } from "@nestjs/common";
import { ISBNValueObject } from "@/modules/reading/domain/object-value/isbn.vo";
import { ImageValueObject } from "@/shared/domain/value-object/image.vo";
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";
import {
  IMAGE_COMPRESSOR_TOKEN,
  type IImageCompress,
} from "@shared/domain/services/image-compress.service";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { ConflictException } from "@/shared/domain/exceptions/conflict.exception";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import {
  type IPermissionPolicy,
  PERMISSION_POLICY_TOKEN,
} from "@/shared/domain/services/permission-policy.service";
import { PermissionException } from "@/shared/domain/exceptions/permission.exception";
/**
 * Update book use case
 * @description Update book use case which is used to update a book.
 */
export class UpdateBookUseCase {
  /**
   * Constructor for UpdateBookUseCase
   * @param bookRepository - The book repository
   * @param cloudService - The cloud service
   * @param imageCompressor - The image compressor
   * @param permissionPolicy - The permission policy
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
   * Execute the update book use case
   * @param user - The user requesting the update
   * @param id - The id of the book to update
   * @param title - The title of the book to update
   * @param pages - The pages of the book to update
   * @param author - The author of the book to update
   * @param description - The description of the book to update
   * @param isbn10 - The ISBN10 of the book to update
   * @param isbn13 - The ISBN13 of the book to update
   * @param coverImage - The cover image of the book to update
   * @returns The updated book
   */
  public async execute(
    user: UserEntity,
    id: ObjectIdValueObject,
    title?: string | null,
    pages?: PagesValueObject | null,
    author?: string | null,
    description?: string | null,
    isbn10?: ISBNValueObject | null,
    isbn13?: ISBNValueObject | null,
    coverImage?: ImageValueObject | null,
  ): Promise<BookEntity> {
    // check if the book exists
    const book: BookEntity | null = await this.bookRepository.findById(id);
    if (book === null) {
      throw new NotFoundException("Book not found");
    }

    // permission check
    if (!(await this.permissionPolicy.canModify(user, book))) {
      throw new PermissionException("Permission denied");
    }

    // if the title is provided
    if (title) {
      book.setTitle(title);
    }

    // if the pages are provided
    if (pages) {
      book.setPages(pages);
    }

    // if the author is provided
    if (author) {
      book.setAuthor(author);
    }

    // if the description is provided
    if (description) {
      book.setDescription(description);
    }

    // if the ISBN10 is provided
    if (isbn10) {
      // check if the other book with this ISBN10 already exists
      const existingBook: BookEntity | null =
        await this.bookRepository.findByISBN10(isbn10.getISBN());
      if (
        existingBook &&
        existingBook.getId().getId() !== book.getId().getId()
      ) {
        throw new ConflictException("Book with ISBN10 already exists");
      }
      book.setISBN10(isbn10);
    }

    // if the ISBN13 is provided
    if (isbn13) {
      // check if the other book with this ISBN13 already exists
      const existingBook: BookEntity | null =
        await this.bookRepository.findByISBN13(isbn13.getISBN());
      if (
        existingBook &&
        existingBook.getId().getId() !== book.getId().getId()
      ) {
        throw new ConflictException("Book with ISBN13 already exists");
      }
      book.setISBN13(isbn13);
    }

    // if the cover image is provided
    if (coverImage) {
      // delete the old cover from the cloud
      if (book.getCoverUrl()) {
        await this.cloudService.delete(book.getCoverUrl()!);
      }

      // compress the cover image
      const compressedCover: ImageValueObject =
        await this.imageCompressor.compressImage(coverImage);

      // upload the compressed cover to the cloud
      const coverUrl: UrlValueObject =
        await this.cloudService.upload(compressedCover);

      book.setCoverUrl(coverUrl);
    }

    // save the book
    await this.bookRepository.save(book);

    // return the book
    return book;
  }
}
