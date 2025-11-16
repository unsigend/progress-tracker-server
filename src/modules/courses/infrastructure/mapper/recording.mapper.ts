import { CourseRecordingEntity } from "@/modules/courses/domain/entities/recording.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { CourseRecord as CourseRecordingModel } from "@prisma/client";
import { RecordTypeValueObject } from "@/modules/courses/domain/value-object/record-type.vo";
import { CourseRecordingResponseDto } from "@/modules/courses/presentation/dtos/recordings/recording.response.dto";

/**
 * Course recording mapper
 * @description Course recording mapper which is used to map the course recording entity to the course recording model and vice versa.
 */
export class CourseRecordingMapper {
  /**
   * Map a course recording entity to a course recording model
   * @param courseRecording - The course recording entity to map
   * @returns The course recording model
   */
  public static toModel(
    courseRecording: CourseRecordingEntity,
  ): CourseRecordingModel {
    return {
      id: courseRecording.getId().getId(),
      userCourseId: courseRecording.getUserCourseId().getId(),
      date: courseRecording.getDate(),
      minutes: courseRecording.getMinutes().getMinutes(),
      recordType: courseRecording.getRecordType().getRecordType(),
      notes: courseRecording.getNotes(),
    };
  }

  /**
   * Map a course recording model to a course recording entity
   * @param courseRecordingModel - The course recording model to map
   * @returns The course recording entity
   */
  public static toEntity(
    courseRecordingModel: CourseRecordingModel,
  ): CourseRecordingEntity {
    return CourseRecordingEntity.reconstitute(
      new ObjectIdValueObject(courseRecordingModel.id),
      new ObjectIdValueObject(courseRecordingModel.userCourseId),
      courseRecordingModel.date,
      courseRecordingModel.minutes,
      new RecordTypeValueObject(courseRecordingModel.recordType),
      courseRecordingModel.notes,
    );
  }

  /**
   * Map a course recording entity to a course recording response dto
   * @param courseRecording - The course recording entity to map
   * @returns The course recording response dto
   */
  public static toResponseDto(
    courseRecording: CourseRecordingEntity,
  ): CourseRecordingResponseDto {
    return {
      id: courseRecording.getId().getId(),
      userCourseId: courseRecording.getUserCourseId().getId(),
      date: courseRecording.getDate(),
      minutes: courseRecording.getMinutes().getMinutes(),
      recordType: courseRecording.getRecordType().getRecordType(),
      notes: courseRecording.getNotes(),
    };
  }
}
