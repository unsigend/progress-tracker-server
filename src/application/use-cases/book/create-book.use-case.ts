// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import interfaces
import type { IBookRepository } from "@domain/repositories/book.repository";
import type { IImageCompress } from "@domain/services/image-compress.interface";
import type { ICloud } from "@domain/services/cloud.interface";

// import tokens
import { BOOK_REPOSITORY_TOKEN } from "@domain/repositories/book.repository";
import { IMAGE_COMPRESSOR_TOKEN } from "@domain/services/image-compress.interface";
import { CLOUD_TOKEN } from "@domain/services/cloud.interface";

// import entities
import { BookEntity } from "@domain/entities/book.entity";

// import value objects
import { PageValueObject } from "@domain/value-objects/book/page.vo";
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { ISBNValueObject } from "@domain/value-objects/book/isbn.vo";
import { UrlValueObject } from "@domain/value-objects/common/url.vo";
import { ImageValueObject } from "@domain/value-objects/common/image.vo";

/**
 * Create book use case
 * @description Create book use case
 */
@Injectable()
export class CreateBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
  ) {}

  /**
   * Execute the create book use case
   * @description Execute the create book use case
   * @param title - The title of the book
   * @param pages - The pages of the book
   * @param createdById - The id of the user who created the book
   * @param author - The author of the book
   * @param description - The description of the book
   * @param isbn10 - The ISBN 10 of the book
   * @param isbn13 - The ISBN 13 of the book
   * @param coverUrl - The cover url of the book
   * @returns The book entity
   */
  async execute(
    title: string,
    pages: PageValueObject,
    createdById: ObjectIdValueObject,
    author?: string | null,
    description?: string | null,
    isbn10?: ISBNValueObject | null,
    isbn13?: ISBNValueObject | null,
    coverFile?: ImageValueObject | null,
  ): Promise<BookEntity> {
    let compressedCoverUrl: UrlValueObject | null = null;

    // if the cover file is provided
    if (coverFile) {
      // compress the image
      const compressedImage: ImageValueObject =
        await this.imageCompressor.compressImage(coverFile);

      // upload the compressed image to the cloud
      compressedCoverUrl = await this.cloudService.upload(compressedImage);
    }

    // create a new book
    const newBook: BookEntity = BookEntity.create(
      title,
      pages,
      createdById,
      author,
      description,
      isbn10,
      isbn13,
      compressedCoverUrl,
    );

    // save the book
    await this.bookRepository.save(newBook);

    // return the book
    return newBook;
  }
}
