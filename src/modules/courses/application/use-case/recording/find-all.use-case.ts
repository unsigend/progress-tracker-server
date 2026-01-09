import { Inject, Injectable } from "@nestjs/common";
import {
  type ICourseRecordingRepository,
  COURSE_RECORDING_REPOSITORY_TOKEN,
} from "@/modules/courses/domain/repositories/recording.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { DailyRecordValueObject } from "@/modules/courses/domain/value-object/daily-record.vo";

/**
 * Find all course recordings use case
 * @description Find all course recordings use case which is used to find all course recordings.
 */
@Injectable()
export class FindAllCourseRecordingsUseCase {
  constructor(
    @Inject(COURSE_RECORDING_REPOSITORY_TOKEN)
    private readonly courseRecordingRepository: ICourseRecordingRepository,
  ) {}

  /**
   * Execute the find all course recordings use case
   * @param userCourseId - The user course id
   * @param limit - The limit (number of days)
   * @param page - The page
   * @param sort - The sort field (default: "date")
   * @param order - The order
   * @returns The daily records and the total count of distinct days
   */
  public async execute(
    userCourseId: ObjectIdValueObject,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: DailyRecordValueObject[]; totalDays: number }> {
    // find the daily records using the new repository method
    const { data, totalDays } =
      await this.courseRecordingRepository.findDailyRecordsByUserCourseId(
        userCourseId,
        limit,
        page,
        sort ?? "date",
        order,
      );

    // return the daily records and the total count of distinct days
    return { data, totalDays };
  }
}
