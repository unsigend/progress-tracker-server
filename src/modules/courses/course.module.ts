import { Module } from "@nestjs/common";

// import modules
import { CoursesPresentationModule } from "./presentation/presentation.module";
import { CoursesApplicationModule } from "./application/application.module";
import { CoursesInfrastructureModule } from "./infrastructure/infrastructure.module";

/**
 * Course module
 * @description Course module which provides the course services
 */
@Module({
  imports: [
    CoursesPresentationModule,
    CoursesApplicationModule,
    CoursesInfrastructureModule,
  ],
  exports: [
    CoursesPresentationModule,
    CoursesApplicationModule,
    CoursesInfrastructureModule,
  ],
})
export class CoursesModule {}
