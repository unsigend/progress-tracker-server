import { UserBookEntity } from "@/modules/reading/domain/entities/user-book.entity";
import {
  type IRecordingRepository,
  RECORDING_REPOSITORY_TOKEN,
} from "@/modules/reading/domain/repositories/recording.repository";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  USER_BOOK_REPOSITORY_TOKEN,
  type IUserBookRepository,
} from "@/modules/reading/domain/repositories/user-book.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
/**
 * Delete recordings use case
 * @description Delete recordings use case which is used to delete recordings.
 */
@Injectable()
export class DeleteRecordingsUseCase {
  constructor(
    @Inject(RECORDING_REPOSITORY_TOKEN)
    private readonly recordingRepository: IRecordingRepository,
    @Inject(USER_BOOK_REPOSITORY_TOKEN)
    private readonly userBookRepository: IUserBookRepository,
  ) {}

  /**
   * Execute the delete recordings use case
   * @param userBookId - The user book id
   * @returns True if the recordings were deleted, false otherwise
   */
  public async execute(userBookId: ObjectIdValueObject): Promise<boolean> {
    // check if the user book exists
    const userBook: UserBookEntity | null =
      await this.userBookRepository.findById(userBookId);
    if (userBook === null) {
      throw new NotFoundException("User book not found");
    }

    // delete the recordings by user book id
    return await this.recordingRepository.deleteByUserBookId(userBookId);
  }
}
