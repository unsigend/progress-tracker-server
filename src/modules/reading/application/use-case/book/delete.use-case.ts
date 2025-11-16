// import dependencies
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { BookEntity } from "@/modules/reading/domain/entities/book.entity";
import {
  BOOK_REPOSITORY_TOKEN,
  type IBookRepository,
} from "@/modules/reading/domain/repositories/book.repository";
import { Inject, NotFoundException } from "@nestjs/common";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";
import { PERMISSION_POLICY_TOKEN } from "@shared/domain/services/permission-policy.service";
import type { IPermissionPolicy } from "@shared/domain/services/permission-policy.service";
import { PermissionException } from "@/shared/domain/exceptions/permission.exception";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";

/**
 * Delete book use case
 * @description Delete book use case which is used to delete a book.
 */
export class DeleteBookUseCase {
  /**
   * Constructor for DeleteBookUseCase
   * @param bookRepository - The book repository
   * @param permissionPolicy - The permission policy
   * @param cloudService - The cloud service
   */
  constructor(
    @Inject(BOOK_REPOSITORY_TOKEN)
    private readonly bookRepository: IBookRepository,
    @Inject(PERMISSION_POLICY_TOKEN)
    private readonly permissionPolicy: IPermissionPolicy<BookEntity>,
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
  ) {}

  /**
   * Execute the delete book use case
   * @param id - The id of the book
   * @returns True if the book was deleted, false otherwise
   */
  public async execute(
    user: UserEntity,
    id: ObjectIdValueObject,
  ): Promise<boolean> {
    // check if the book exists
    const book: BookEntity | null = await this.bookRepository.findById(id);
    if (book === null) {
      throw new NotFoundException("Book not found");
    }

    // permission check
    if (!(await this.permissionPolicy.canDelete(user, book))) {
      throw new PermissionException("Permission denied");
    }

    // if the cover url is not null
    if (book.getCoverUrl()) {
      await this.cloudService.delete(book.getCoverUrl()!);
    }

    // delete the book
    return await this.bookRepository.delete(id);
  }
}
