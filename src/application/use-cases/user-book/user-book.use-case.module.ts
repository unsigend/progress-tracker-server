// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";

// import use cases
import { DeleteUserBookUseCase } from "@/application/use-cases/user-book/delete-user-book.use-case";
import { CreateUserBookUseCase } from "@/application/use-cases/user-book/create-user-book.use-case";
import { FindAllUserBookUseCase } from "@/application/use-cases/user-book/find-all-user-book.use-case";
import { FindUserBookByIdUseCase } from "@/application/use-cases/user-book/find-user-book-id.use-case";

/**
 * User book use case module
 * @description User book use case module
 */
@Module({
  imports: [InfrastructureModule],
  providers: [
    DeleteUserBookUseCase,
    CreateUserBookUseCase,
    FindAllUserBookUseCase,
    FindUserBookByIdUseCase,
  ],
  exports: [
    DeleteUserBookUseCase,
    CreateUserBookUseCase,
    FindAllUserBookUseCase,
    FindUserBookByIdUseCase,
  ],
})
export class UserBookUseCaseModule {}
