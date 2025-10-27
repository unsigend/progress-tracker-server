// import dependencies
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import { ISBNValueObject } from "@/modules/reading/domain/object-value/isbn.vo";
import { PagesValueObject } from "@/modules/reading/domain/object-value/pages.vo";
import { ImageValueObject } from "@/shared/domain/value-object/image.vo";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { Inject } from "@nestjs/common";
import {
  BOOK_REPOSITORY_TOKEN,
  type IBookRepository,
} from "@/modules/reading/domain/repositories/book.repository";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";
import {
  IMAGE_COMPRESSOR_TOKEN,
  type IImageCompress,
} from "@shared/domain/services/image-compress.service";

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
  ) {}

  /**
   * Execute the create book use case
   * @param book - The book to create
   * @returns The created book
   */
  public async execute(
    title: string,
    pages: PagesValueObject,
    createdById: ObjectIdValueObject,
    author?: string | null,
    description?: string | null,
    isbn10?: ISBNValueObject | null,
    isbn13?: ISBNValueObject | null,
    coverImage?: ImageValueObject | null,
  ): Promise<BookEntity> {
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
