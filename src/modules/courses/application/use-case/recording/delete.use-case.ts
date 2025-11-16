import { Inject, Injectable } from "@nestjs/common";
import {
  type ICourseRecordingRepository,
  COURSE_RECORDING_REPOSITORY_TOKEN,
} from "@/modules/courses/domain/repositories/recording.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";

/**
 * Delete course recordings use case
 * @description Delete course recordings use case which is used to delete course recordings.
 */
@Injectable()
export class DeleteCourseRecordingsUseCase {
  constructor(
    @Inject(COURSE_RECORDING_REPOSITORY_TOKEN)
    private readonly courseRecordingRepository: ICourseRecordingRepository,
  ) {}

  /**
   * Execute the delete course recordings use case
   * @param userCourseId - The user course id
   * @returns True if the course recordings were deleted, false otherwise
   */
  public async execute(userCourseId: ObjectIdValueObject): Promise<boolean> {
    // delete the course recordings by user course id
    return await this.courseRecordingRepository.deleteByUserCourseId(
      userCourseId,
    );
  }
}
