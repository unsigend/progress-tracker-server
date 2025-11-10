import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@/modules/database/database.module";

// import tokens
import { COURSE_REPOSITORY_TOKEN } from "../domain/repositories/course.repository";
import { USER_COURSE_REPOSITORY_TOKEN } from "../domain/repositories/user-course.repository";
import { PERMISSION_POLICY_TOKEN } from "@/shared/domain/services/permission-policy.service";
import { COURSE_RECORDING_REPOSITORY_TOKEN } from "../domain/repositories/recording.repository";

// import services
import { CoursePermissionPolicyService } from "./services/permission-policy/course-permission-policy.service";

// import repositories
import { CourseRepository } from "./repositories/course.repository";
import { UserCourseRepository } from "./repositories/user-course.repository";
import { CourseRecordingRepository } from "./repositories/recording.repository";

/**
 * Courses infrastructure module
 * @description Courses infrastructure module which provides the courses infrastructure services
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: COURSE_REPOSITORY_TOKEN,
      useClass: CourseRepository,
    },
    {
      provide: USER_COURSE_REPOSITORY_TOKEN,
      useClass: UserCourseRepository,
    },
    {
      provide: COURSE_RECORDING_REPOSITORY_TOKEN,
      useClass: CourseRecordingRepository,
    },
    {
      provide: PERMISSION_POLICY_TOKEN,
      useClass: CoursePermissionPolicyService,
    },
  ],
  exports: [
    COURSE_REPOSITORY_TOKEN,
    USER_COURSE_REPOSITORY_TOKEN,
    COURSE_RECORDING_REPOSITORY_TOKEN,
    PERMISSION_POLICY_TOKEN,
  ],
})
export class CoursesInfrastructureModule {}
