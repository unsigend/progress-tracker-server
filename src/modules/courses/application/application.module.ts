import { Module } from "@nestjs/common";

// import modules
import { CoursesInfrastructureModule } from "../infrastructure/infrastructure.module";
import { InfrastructureModule } from "@/shared/infrastructure/infrastructure.module";

// import course use cases
import { FindCourseIdUseCase } from "./use-case/course/find-id.use-case";
import { DeleteCourseUseCase } from "./use-case/course/delete.use-case";
import { CreateCourseUseCase } from "./use-case/course/create.use-case";
import { FindAllCoursesUseCase } from "./use-case/course/find-all.use-case";
import { UpdateCourseUseCase } from "./use-case/course/update.use-case";
import { MyCoursesUseCase } from "./use-case/course/my-courses.use-case";

// import user course use cases
import { CreateUserCourseUseCase } from "./use-case/user-course/create.use-case";
import { DeleteUserCourseUseCase } from "./use-case/user-course/delete.use-case";
import { FindAllUserCoursesUseCase } from "./use-case/user-course/find-all.use-case";
import { FindUserCourseIdUseCase } from "./use-case/user-course/find-id.use-case";
import { FindUserCourseIdWithCourseUseCase } from "./use-case/user-course/find-id-with-course.use-case";
import { FindAllUserCoursesWithCourseUseCase } from "./use-case/user-course/find-all-with-course.use-case";
import { MarkCourseCompleteUseCase } from "./use-case/user-course/mark-complete.use-case";

// import course recording use cases
import { CreateCourseRecordingUseCase } from "./use-case/recording/create.use-case";
import { DeleteCourseRecordingsUseCase } from "./use-case/recording/delete.use-case";
import { FindAllCourseRecordingsUseCase } from "./use-case/recording/find-all.use-case";

// import user course use cases
const userCourseUseCases = [
  CreateUserCourseUseCase,
  DeleteUserCourseUseCase,
  FindAllUserCoursesUseCase,
  FindUserCourseIdUseCase,
  FindUserCourseIdWithCourseUseCase,
  FindAllUserCoursesWithCourseUseCase,
  MarkCourseCompleteUseCase,
];

// import course use cases
const courseUseCases = [
  FindCourseIdUseCase,
  DeleteCourseUseCase,
  CreateCourseUseCase,
  FindAllCoursesUseCase,
  UpdateCourseUseCase,
  MyCoursesUseCase,
];

// import course recording use cases
const courseRecordingUseCases = [
  CreateCourseRecordingUseCase,
  DeleteCourseRecordingsUseCase,
  FindAllCourseRecordingsUseCase,
];

/**
 * Courses application module
 * @description Courses application module which provides the courses application services
 */
@Module({
  imports: [CoursesInfrastructureModule, InfrastructureModule],
  providers: [
    ...courseUseCases,
    ...userCourseUseCases,
    ...courseRecordingUseCases,
  ],
  exports: [
    ...courseUseCases,
    ...userCourseUseCases,
    ...courseRecordingUseCases,
  ],
})
export class CoursesApplicationModule {}
