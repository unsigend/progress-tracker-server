// import dependencies
import {
  type ICourseRecordingRepository,
  COURSE_RECORDING_REPOSITORY_TOKEN,
} from "@/modules/courses/domain/repositories/recording.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { Inject, Injectable } from "@nestjs/common";
import { CourseRecordingEntity } from "@/modules/courses/domain/entities/recording.entity";

/**
 * Course recording detail use case
 * @description Course recording detail use case which is used to handle the course recording detail statistics requests.
 */
@Injectable()
export class CourseRecordingDetailUseCase {
  constructor(
    @Inject(COURSE_RECORDING_REPOSITORY_TOKEN)
    private readonly courseRecordingRepository: ICourseRecordingRepository,
  ) {}

  /**
   * Execute the course recording detail use case
   * @param userCourseId - The user course id
   * @returns The course recording detail statistics
   */
  public async execute(userCourseId: ObjectIdValueObject): Promise<{
    totalMinutes: number;
    minutesByType: Record<string, number>;
  }> {
    // Fetch all recordings for the user course
    const { data: recordings } =
      await this.courseRecordingRepository.findByUserCourseId(userCourseId);

    // Calculate total minutes
    let totalMinutes = 0;

    // Group minutes by record type
    const minutesByType: Record<string, number> = {};

    recordings.forEach((recording: CourseRecordingEntity) => {
      const minutes = recording.getMinutes().getMinutes();
      const recordType = recording.getRecordType().getRecordType();

      // Add to total
      totalMinutes += minutes;

      // Add to type-specific total
      if (!minutesByType[recordType]) {
        minutesByType[recordType] = 0;
      }
      minutesByType[recordType] += minutes;
    });

    return {
      totalMinutes,
      minutesByType,
    };
  }
}
