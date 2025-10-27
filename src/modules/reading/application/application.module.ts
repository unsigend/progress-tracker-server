// import dependencies
import { Module } from "@nestjs/common";

// import book use cases
import { FindAllBooksUseCase } from "./use-case/book/find-all.use-case";
import { FindBookIdUseCase } from "./use-case/book/find-id.use-case";
import { CreateBookUseCase } from "./use-case/book/create.use-case";
import { UpdateBookUseCase } from "./use-case/book/update.use-case";
import { DeleteBookUseCase } from "./use-case/book/delete.use-case";

// import user book use cases
import { CreateUserBookUseCase } from "./use-case/user-book/create.use-case";
import { DeleteUserBookUseCase } from "./use-case/user-book/delete.use-case";
import { FindAllUserBooksUseCase } from "./use-case/user-book/find-all.use-case";
import { FindUserBookIdUseCase } from "./use-case/user-book/find-id.use-case";

// import modules
import { CloudModule } from "@/modules/cloud/cloud.module";
import { ReadingInfrastructureModule } from "../infrastructure/infrastructure.module";
import { InfrastructureModule } from "@/shared/infrastructure/infrastructure.module";
import { FindAllRecordingsUseCase } from "./use-case/recording/find-all.use-case";

// import user book use cases
const userBookUseCases = [
  CreateUserBookUseCase,
  DeleteUserBookUseCase,
  FindAllUserBooksUseCase,
  FindUserBookIdUseCase,
];

// import book use cases
const bookUseCases = [
  FindAllBooksUseCase,
  FindBookIdUseCase,
  CreateBookUseCase,
  UpdateBookUseCase,
  DeleteBookUseCase,
];

// import recording use cases
const recordingUseCases = [FindAllRecordingsUseCase];

/**
 * Reading application module
 * @description Reading application module which provides the reading application services
 */
@Module({
  imports: [ReadingInfrastructureModule, InfrastructureModule, CloudModule],
  providers: [...bookUseCases, ...userBookUseCases, ...recordingUseCases],
  exports: [...bookUseCases, ...userBookUseCases, ...recordingUseCases],
})
export class ReadingApplicationModule {}
