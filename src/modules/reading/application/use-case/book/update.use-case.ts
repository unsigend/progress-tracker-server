// import dependencies

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
import {
  CLOUD_TOKEN,
  type ICloud,
} from "@shared/domain/services/cloud.service";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";

/**
 * Update book use case
 * @description Update book use case which is used to update a book.
 */
export class UpdateBookUseCase {
  /**
   * Constructor for UpdateBookUseCase
   * @param bookRepository - The book repository
   */
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
  ) {}

  /**
   * Execute the update book use case
   * @param book - The book to update
   * @returns The updated book
   */
  public async execute(
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
      book.setISBN10(isbn10);
    }

    // if the ISBN13 is provided
    if (isbn13) {
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
