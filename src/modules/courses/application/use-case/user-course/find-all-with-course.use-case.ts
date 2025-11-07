import { Inject, Injectable } from "@nestjs/common";
import { USER_COURSE_REPOSITORY_TOKEN } from "@/modules/courses/domain/repositories/user-course.repository";
import { type IUserCourseRepository } from "@/modules/courses/domain/repositories/user-course.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserCourseEntity } from "@/modules/courses/domain/entities/user-course.entity";
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import { QueryBase } from "@/shared/domain/queries/base.query";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";

/**
 * Find all user courses with course use case
 * @description Find all user courses with course use case which is used to find all user courses with course.
 */
@Injectable()
export class FindAllUserCoursesWithCourseUseCase {
  /**
   * Constructor for FindAllUserCoursesWithCourseUseCase
   * @param userCourseRepository - The user course repository
   */
  constructor(
    @Inject(USER_COURSE_REPOSITORY_TOKEN)
    private readonly userCourseRepository: IUserCourseRepository,
  ) {}

  /**
   * Execute the find all user courses with course use case
   * @param userId - The user id
   * @param field - The field to query
   * @param value - The value to query
   * @param limit - The limit of the user courses
   * @param page - The page of the user courses
   * @param sort - The sort of the user courses
   * @param order - The order of the user courses
   * @returns The user courses and the total count of the user courses
   */
  public async execute(
    userId: ObjectIdValueObject,
    field?: string,
    value?: string,
    limit?: number,
    page?: number,
    sort?: "createdAt" | "updatedAt" | "completedDate" | "startDate",
    order?: "asc" | "desc",
  ): Promise<{
    data: Array<{ userCourse: UserCourseEntity; course: CourseEntity }>;
    totalCount: number;
  }> {
    // build the filters
    const filters: Filters = [];
    if (field && value) {
      filters.push({
        field: field,
        operator: FilterOperator.EQUALS,
        value: value,
      });
    }

    // always add the constrains for the user id
    filters.push({
      field: "userId",
      operator: FilterOperator.EQUALS,
      value: userId.getId(),
    });

    // build the query
    const query: QueryBase = new QueryBase(
      filters,
      FilterLogic.AND,
      limit,
      page,
      sort,
      order,
    );

    // find all user courses with course
    const { data, totalCount } =
      await this.userCourseRepository.findAllWithCourse(query);

    // return the user courses and the total count of the user courses
    return { data, totalCount };
  }
}
