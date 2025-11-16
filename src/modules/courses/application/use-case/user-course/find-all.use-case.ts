import { Inject, Injectable } from "@nestjs/common";
import { USER_COURSE_REPOSITORY_TOKEN } from "@/modules/courses/domain/repositories/user-course.repository";
import { type IUserCourseRepository } from "@/modules/courses/domain/repositories/user-course.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserCourseEntity } from "@/modules/courses/domain/entities/user-course.entity";
import { QueryBase } from "@/shared/domain/queries/base.query";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";

/**
 * Find all user courses use case
 * @description Find all user courses use case which is used to find all user courses.
 */
@Injectable()
export class FindAllUserCoursesUseCase {
  /**
   * Constructor for FindAllUserCoursesUseCase
   * @param userCourseRepository - The user course repository
   */
  constructor(
    @Inject(USER_COURSE_REPOSITORY_TOKEN)
    private readonly userCourseRepository: IUserCourseRepository,
  ) {}

  /**
   * Execute the find all user courses use case
   * @param query - The query
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
  ): Promise<{ data: UserCourseEntity[]; totalCount: number }> {
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

    // find all user courses
    const { data, totalCount } = await this.userCourseRepository.findAll(query);

    // return the user courses and the total count of the user courses
    return { data, totalCount };
  }
}
