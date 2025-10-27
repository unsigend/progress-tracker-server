// import dependencies
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import {
  BOOK_REPOSITORY_TOKEN,
  type IBookRepository,
} from "@/modules/reading/domain/repositories/book.repository";
import { Inject } from "@nestjs/common";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";

/**
 * Delete book use case
 * @description Delete book use case which is used to delete a book.
 */
export class DeleteBookUseCase {
  /**
   * Constructor for DeleteBookUseCase
   * @param bookRepository - The book repository
   */
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
  ) {}

  /**
   * Execute the delete book use case
   * @param id - The id of the book
   * @returns True if the book was deleted, false otherwise
   */
  public async execute(id: ObjectIdValueObject): Promise<boolean> {
    // check if the book exists
    const book: BookEntity | null = await this.bookRepository.findById(id);
    if (book === null) {
      return false;
    }

    // if the cover url is not null
    if (book.getCoverUrl()) {
      await this.cloudService.delete(book.getCoverUrl()!);
    }

    // delete the book
    return await this.bookRepository.delete(id);
  }
}
