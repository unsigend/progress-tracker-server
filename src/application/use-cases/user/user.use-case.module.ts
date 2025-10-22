// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";

// import use cases
import { CreateUserUseCase } from "@/application/use-cases/user/create-user.use-case";
import { FindUserByIdUseCase } from "@/application/use-cases/user/find-user-id.use-case";
import { FindUserByEmailUseCase } from "@/application/use-cases/user/find-user-email.use-case";
import { FindAllUsersUseCase } from "@/application/use-cases/user/find-all-user.use-case";
import { UpdateUserUseCase } from "@/application/use-cases/user/update-user.use-case";
import { DeleteUserUseCase } from "@/application/use-cases/user/delete-user.use-case";

/**
 * User use cases module
 * @description User use cases module
 */
@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindUserByEmailUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindUserByEmailUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserUseCaseModule {}
