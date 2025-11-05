import { Module } from "@nestjs/common";

// import modules
import { CoursesApplicationModule } from "../application/application.module";
import { CoursesInfrastructureModule } from "../infrastructure/infrastructure.module";
import { CourseController } from "./controllers/course.controller";

/**
 * Courses presentation module
 * @description Courses presentation module which provides the courses presentation services
 */
@Module({
  controllers: [CourseController],
  imports: [CoursesApplicationModule, CoursesInfrastructureModule],
  exports: [],
})
export class CoursesPresentationModule {}
