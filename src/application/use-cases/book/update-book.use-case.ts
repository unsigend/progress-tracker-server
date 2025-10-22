// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import interfaces
import type { IBookRepository } from "@domain/repositories/book.repository";
import type { IImageCompress } from "@/domain/services/image-compress.interface";
import type { ICloud } from "@/domain/services/cloud.interface";

// import tokens
import { BOOK_REPOSITORY_TOKEN } from "@domain/repositories/book.repository";
import { IMAGE_COMPRESSOR_TOKEN } from "@/domain/services/image-compress.interface";
import { CLOUD_TOKEN } from "@/domain/services/cloud.interface";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { PageValueObject } from "@domain/value-objects/book/page.vo";
import { ISBNValueObject } from "@domain/value-objects/book/isbn.vo";
import { ImageValueObject } from "@domain/value-objects/common/image.vo";
import { UrlValueObject } from "@domain/value-objects/common/url.vo";

// import entities
import { BookEntity } from "@domain/entities/book.entity";

/**
 * Update book use case
 * @description Update book use case
 */
@Injectable()
export class UpdateBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
  ) {}

  /**
   * Execute the update book use case
   * @description Execute the update book use case
   * @param id - The id of the book to be updated
   * @param book - The book to be updated
   * @returns The book entity
   */
  async execute(
    id: ObjectIdValueObject,
    title?: string | null,
    pages?: PageValueObject | null,
    author?: string | null,
    description?: string | null,
    isbn10?: ISBNValueObject | null,
    isbn13?: ISBNValueObject | null,
    coverFile?: ImageValueObject | null,
  ): Promise<BookEntity> {
    // find the book by id
    const book: BookEntity | null = await this.bookRepository.findById(id);
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    // if the title is provided, update the title
    if (title) {
      book.setTitle(title);
    }

    // if the pages is provided, update the pages
    if (pages) {
      book.setPages(pages);
    }

    // if the author is provided, update the author
    if (author) {
      book.setAuthor(author);
    }

    // if the description is provided, update the description
    if (description) {
      book.setDescription(description);
    }

    // if the ISBN 10 is provided, update the ISBN 10
    if (isbn10) {
      book.setISBN10(isbn10);
    }

    // if the ISBN 13 is provided, update the ISBN 13
    if (isbn13) {
      book.setISBN13(isbn13);
    }

    // if the cover file is provided, update the cover file
    if (coverFile) {
      // compress the image
      const compressedImage: ImageValueObject =
        await this.imageCompressor.compressImage(coverFile);

      // upload the compressed image to the cloud
      const coverUrl: UrlValueObject =
        await this.cloudService.upload(compressedImage);

      // set the cover url of the book
      book.setCoverUrl(coverUrl);
    }

    // save the book
    await this.bookRepository.save(book);

    // return the book
    return book;
  }
}
