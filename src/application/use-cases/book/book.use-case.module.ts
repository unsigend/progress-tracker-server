// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";

// import use cases
import { CreateBookUseCase } from "@/application/use-cases/book/create-book.use-case";
import { FindAllBooksUseCase } from "@/application/use-cases/book/find-all-book.use-case";
import { UpdateBookUseCase } from "@/application/use-cases/book/update-book.use-case";
import { DeleteBookUseCase } from "@/application/use-cases/book/delete-book.use-case";
import { FindBookByIdUseCase } from "@/application/use-cases/book/find-book-id.use-case";
import { FindBookByISBN10UseCase } from "@/application/use-cases/book/find-book-isbn10.use-case";
import { FindBookByISBN13UseCase } from "@/application/use-cases/book/find-book-isbn13.use-case";

/**
 * Book use case module
 * @description Book use case module
 */
@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateBookUseCase,
    FindAllBooksUseCase,
    FindBookByIdUseCase,
    FindBookByISBN10UseCase,
    FindBookByISBN13UseCase,
    UpdateBookUseCase,
    DeleteBookUseCase,
  ],
  exports: [
    CreateBookUseCase,
    FindAllBooksUseCase,
    FindBookByIdUseCase,
    FindBookByISBN10UseCase,
    FindBookByISBN13UseCase,
    UpdateBookUseCase,
    DeleteBookUseCase,
  ],
})
export class BookUseCaseModule {}
