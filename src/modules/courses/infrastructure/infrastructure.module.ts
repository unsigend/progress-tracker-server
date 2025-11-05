import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@/modules/database/database.module";

// import tokens
import { COURSE_REPOSITORY_TOKEN } from "../domain/repositories/course.repository";
import { PERMISSION_POLICY_TOKEN } from "@/shared/domain/services/permission-policy.service";

// import services
import { CoursePermissionPolicyService } from "./services/permission-policy/course-permission-policy.service";

// import repositories
import { CourseRepository } from "./repositories/course.repository";

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
      provide: PERMISSION_POLICY_TOKEN,
      useClass: CoursePermissionPolicyService,
    },
  ],
  exports: [COURSE_REPOSITORY_TOKEN, PERMISSION_POLICY_TOKEN],
})
export class CoursesInfrastructureModule {}
