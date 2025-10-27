// import dependencies
import { Module } from "@nestjs/common";

// import use cases
import { FindAllBooksUseCase } from "./use-case/book/find-all.use-case";
import { FindBookIdUseCase } from "./use-case/book/find-id.use-case";
import { CreateBookUseCase } from "./use-case/book/create.use-case";
import { UpdateBookUseCase } from "./use-case/book/update.use-case";
import { DeleteBookUseCase } from "./use-case/book/delete.use-case";

// import infrastructure module
import { ReadingInfrastructureModule } from "../infrastructure/infrastructure.module";

/**
 * Reading application module
 * @description Reading application module which provides the reading application services
 */
@Module({
  imports: [ReadingInfrastructureModule],
  providers: [
    FindAllBooksUseCase,
    FindBookIdUseCase,
    CreateBookUseCase,
    UpdateBookUseCase,
    DeleteBookUseCase,
  ],
  exports: [
    FindAllBooksUseCase,
    FindBookIdUseCase,
    CreateBookUseCase,
    UpdateBookUseCase,
    DeleteBookUseCase,
  ],
})
export class ReadingApplicationModule {}
