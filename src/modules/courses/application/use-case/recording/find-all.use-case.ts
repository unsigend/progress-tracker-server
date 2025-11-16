import { Inject, Injectable } from "@nestjs/common";
import {
  type ICourseRecordingRepository,
  COURSE_RECORDING_REPOSITORY_TOKEN,
} from "@/modules/courses/domain/repositories/recording.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { CourseRecordingEntity } from "@/modules/courses/domain/entities/recording.entity";

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
   * @returns The course recordings and the total count of the course recordings
   */
  public async execute(
    userCourseId: ObjectIdValueObject,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: CourseRecordingEntity[]; totalCount: number }> {
    // build the filters
    const filters: Filters = [];
    filters.push({
      field: "userCourseId",
      operator: FilterOperator.EQUALS,
      value: userCourseId.getId(),
    });

    // build the query
    const query: QueryBase = new QueryBase(
      filters,
      FilterLogic.AND,
      limit,
      page,
      "date",
      order,
    );

    // find the course recordings
    const { data, totalCount } =
      await this.courseRecordingRepository.findAll(query);

    // return the course recordings and the total count of the course recordings
    return { data, totalCount };
  }
}
