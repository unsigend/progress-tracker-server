import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import {
  COURSE_REPOSITORY_TOKEN,
  type ICourseRepository,
} from "@/modules/courses/domain/repositories/course.repository";
import { QueryBase } from "@/shared/domain/queries/base.query";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { Inject, Injectable } from "@nestjs/common";

/**
 * My courses use case
 * @description My courses use case which is used to find the courses for the current user.
 */
@Injectable()
export class MyCoursesUseCase {
  /**
   * Constructor for MyCoursesUseCase
   * @param courseRepository - The course repository
   */
  constructor(
    @Inject(COURSE_REPOSITORY_TOKEN)
    private readonly courseRepository: ICourseRepository,
  ) {}

  /**
   * Execute the my courses use case
   * @param userId - The user id
   * @returns The courses
   */
  public async execute(
    userId: ObjectIdValueObject,
    field?: string,
    value?: string,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: CourseEntity[]; totalCount: number }> {
    // find the user courses by user id
    const filters: Filters = [];

    // default constrains
    filters.push({
      field: "createdById",
      operator: FilterOperator.EQUALS,
      value: userId.getId(),
    });

    // if both field and value are provided then it will be field=value
    if (field && value) {
      let formattedValue: string | boolean;
      if (field === "categories") {
        formattedValue = value.toLowerCase();
      } else if (field === "isPublic") {
        formattedValue = value === "true";
      } else {
        formattedValue = value;
      }
      filters.push({
        field: field,
        operator: FilterOperator.EQUALS,
        value: formattedValue,
      });
    }

    // build the query
    const query: QueryBase = new QueryBase(
      filters,
      FilterLogic.AND,
      limit,
      page,
      sort,
      order,
    );

    // find the courses
    const { data, totalCount } = await this.courseRepository.findAll(query);

    // return the courses and the total count of the courses
    return { data, totalCount };
  }
}
