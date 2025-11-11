import { Inject, Injectable } from "@nestjs/common";
import {
  type ICourseRecordingRepository,
  COURSE_RECORDING_REPOSITORY_TOKEN,
} from "@/modules/courses/domain/repositories/recording.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { CourseRecordingEntity } from "@/modules/courses/domain/entities/recording.entity";
import { RecordTypeValueObject } from "@/modules/courses/domain/value-object/record-type.vo";
import { USER_COURSE_REPOSITORY_TOKEN } from "@/modules/courses/domain/repositories/user-course.repository";
import { type IUserCourseRepository } from "@/modules/courses/domain/repositories/user-course.repository";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { FilterOperator } from "@/shared/domain/queries/filter";
import { UserCourseEntity } from "@/modules/courses/domain/entities/user-course.entity";
import { FilterLogic } from "@/shared/domain/queries/filter";

/**
 * Create course recording use case
 * @description Create course recording use case which is used to create course recordings.
 */
@Injectable()
export class CreateCourseRecordingUseCase {
  constructor(
    @Inject(COURSE_RECORDING_REPOSITORY_TOKEN)
    private readonly courseRecordingRepository: ICourseRecordingRepository,
    @Inject(USER_COURSE_REPOSITORY_TOKEN)
    private readonly userCourseRepository: IUserCourseRepository,
  ) {}

  /**
   * Execute the create course recording use case
   * @param courseRecording - The course recording to create
   * @returns The created course recording
   */
  public async execute(
    userCourseId: ObjectIdValueObject,
    date: Date,
    minutes: number,
    recordType: RecordTypeValueObject,
    notes?: string | null,
  ): Promise<CourseRecordingEntity> {
    // check if the user course exists
    const userCourse: UserCourseEntity | null =
      await this.userCourseRepository.findById(userCourseId);
    if (!userCourse) {
      throw new NotFoundException("User course not found");
    }

    // check if the recording with same date and record type already exists
    const query: QueryBase = new QueryBase(
      [
        {
          field: "userCourseId",
          operator: FilterOperator.EQUALS,
          value: userCourseId.getId(),
        },
        { field: "date", operator: FilterOperator.EQUALS, value: date },
        {
          field: "recordType",
          operator: FilterOperator.EQUALS,
          value: recordType.getRecordType(),
        },
      ],
      FilterLogic.AND,
      1,
      1,
      "date",
      "desc",
    );
    const { data, totalCount } =
      await this.courseRecordingRepository.findAll(query);
    let courseRecordingEntity: CourseRecordingEntity | null = null;

    // if exists merge it
    if (totalCount > 0) {
      courseRecordingEntity = data[0];
      courseRecordingEntity.merge(minutes, notes ?? null);
      await this.courseRecordingRepository.save(courseRecordingEntity);
    } else {
      // create the course recording entity
      courseRecordingEntity = CourseRecordingEntity.create(
        userCourseId,
        date,
        minutes,
        recordType,
        notes ?? null,
      );
      await this.courseRecordingRepository.save(courseRecordingEntity);

      // add days to the user course
      userCourse.addDays(1);
    }

    // add minutes to the user course
    userCourse.addMinutes(minutes);

    // save the user course
    await this.userCourseRepository.save(userCourse);

    // return the course recording entity
    return courseRecordingEntity;
  }
}
