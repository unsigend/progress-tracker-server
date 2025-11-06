import { Module } from "@nestjs/common";

// import modules
import { CoursesInfrastructureModule } from "../infrastructure/infrastructure.module";
import { InfrastructureModule } from "@/shared/infrastructure/infrastructure.module";

// import use cases
import { FindCourseIdUseCase } from "./use-case/course/find-id.use-case";
import { DeleteCourseUseCase } from "./use-case/course/delete.use-case";
import { CreateCourseUseCase } from "./use-case/course/create.use-case";
import { FindAllCoursesUseCase } from "./use-case/course/find-all.use-case";
import { UpdateCourseUseCase } from "./use-case/course/update.use-case";

// import course use cases
const courseUseCases = [
  FindCourseIdUseCase,
  DeleteCourseUseCase,
  CreateCourseUseCase,
  FindAllCoursesUseCase,
  UpdateCourseUseCase,
];

/**
 * Courses application module
 * @description Courses application module which provides the courses application services
 */
@Module({
  imports: [CoursesInfrastructureModule, InfrastructureModule],
  providers: [...courseUseCases],
  exports: [...courseUseCases],
})
export class CoursesApplicationModule {}
