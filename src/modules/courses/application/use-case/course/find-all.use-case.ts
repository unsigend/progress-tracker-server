import { COURSE_REPOSITORY_TOKEN } from "@/modules/courses/domain/repositories/course.repository";
import { Inject, Injectable } from "@nestjs/common";
import { type ICourseRepository } from "@/modules/courses/domain/repositories/course.repository";
import { PERMISSION_POLICY_TOKEN } from "@/shared/domain/services/permission-policy.service";
import { type IPermissionPolicy } from "@/shared/domain/services/permission-policy.service";
import { CourseEntity } from "@/modules/courses/domain/entities/course.entity";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { PermissionException } from "@/shared/domain/exceptions/permission.exception";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";
import { QueryBase } from "@/shared/domain/queries/base.query";

/**
 * Find all courses use case
 * @description Find all courses use case which is used to find all courses.
 */
@Injectable()
export class FindAllCoursesUseCase {
  /**
   * Constructor for FindAllCoursesUseCase
   * @param courseRepository - The course repository
   */
  constructor(
    @Inject(COURSE_REPOSITORY_TOKEN)
    private readonly courseRepository: ICourseRepository,
    @Inject(PERMISSION_POLICY_TOKEN)
    private readonly permissionPolicy: IPermissionPolicy<CourseEntity>,
  ) {}

  /**
   * Execute the find all courses use case
   * @param user - The user requesting the find all courses
   * @param field - The field to filter by
   * @param value - The value to filter by
   * @param limit - The limit to query
   * @param page - The page to query
   * @param sort - The sort to query
   * @param order - The order to query
   * @returns The courses and the total count of the courses
   */
  public async execute(
    user: UserEntity,
    field?: string,
    value?: string,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: CourseEntity[]; totalCount: number }> {
    // permission check
    if (!(await this.permissionPolicy.canAccessCollection(user))) {
      throw new PermissionException("Permission denied");
    }

    const filters: Filters = [];
    if (value) {
      if (field) {
        filters.push({
          field: field,
          operator: FilterOperator.EQUALS,
          value: value,
        });
      } else {
        // the default filters are: [name CONTAINS value]
        filters.push({
          field: "name",
          operator: FilterOperator.CONTAINS,
          value: value,
        });
      }
    }

    // build the query object
    const query: QueryBase = new QueryBase(
      filters,
      FilterLogic.AND,
      limit,
      page,
      sort,
      order,
    );

    // find all courses
    const { data, totalCount } = await this.courseRepository.findAll(query);

    // return the courses and the total count of the courses
    return { data, totalCount };
  }
}
