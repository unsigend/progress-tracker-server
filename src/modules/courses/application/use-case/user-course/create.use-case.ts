import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { USER_COURSE_REPOSITORY_TOKEN } from "@/modules/courses/domain/repositories/user-course.repository";
import { type IUserCourseRepository } from "@/modules/courses/domain/repositories/user-course.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UserCourseEntity } from "@/modules/courses/domain/entities/user-course.entity";

/**
 * Create user course use case
 * @description Create user course use case which is used to create a user course.
 */
@Injectable()
export class CreateUserCourseUseCase {
  /**
   * Constructor for CreateUserCourseUseCase
   * @param userCourseRepository - The user course repository
   */
  constructor(
    @Inject(USER_COURSE_REPOSITORY_TOKEN)
    private readonly userCourseRepository: IUserCourseRepository,
  ) {}

  /**
   * Execute the create user course use case
   * @param userCourse - The user course to create
   * @returns The created user course
   */
  public async execute(
    userId: ObjectIdValueObject,
    courseId: ObjectIdValueObject,
  ): Promise<UserCourseEntity> {
    // check if the user course already exists
    const existingUserCourse: UserCourseEntity | null =
      await this.userCourseRepository.findByCourseIdAndUserId(courseId, userId);
    if (existingUserCourse) {
      throw new ConflictException("User course already exists");
    }

    // create the user course entity
    const userCourseEntity: UserCourseEntity = UserCourseEntity.create(
      courseId,
      userId,
    );

    // save the user course entity
    await this.userCourseRepository.save(userCourseEntity);

    // return the user course entity
    return userCourseEntity;
  }
}
