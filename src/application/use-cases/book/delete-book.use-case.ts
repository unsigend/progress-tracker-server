// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import interfaces
import type { IBookRepository } from "@domain/repositories/book.repository";
import type { ICloud } from "@domain/services/cloud.interface";

// import tokens
import { BOOK_REPOSITORY_TOKEN } from "@domain/repositories/book.repository";
import { CLOUD_TOKEN } from "@domain/services/cloud.interface";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

// import entities
import { BookEntity } from "@domain/entities/book.entity";

/**
 * Delete book use case
 * @description Delete book use case
 */
@Injectable()
export class DeleteBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
  ) {}

  /**
   * Execute the delete book use case
   * @description Execute the delete book use case
   * @param id - The id of the book to be deleted
   * @returns void
   */
  async execute(id: ObjectIdValueObject): Promise<void> {
    // find the book by id
    const book: BookEntity | null = await this.bookRepository.findById(id);
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    // if the book has a cover url, delete the image from the cloud
    if (book.getCoverUrl()) {
      await this.cloudService.delete(book.getCoverUrl()!);
    }

    // delete the book
    book.delete();

    // delete the book in repository
    await this.bookRepository.delete(id);
  }
}
