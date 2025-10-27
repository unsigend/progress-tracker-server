// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { UserInfrastructureModule } from "../infrastructure/infrastructure.module";
import { CloudModule } from "@/modules/cloud/cloud.module";

// import shared infrastructure module
import { InfrastructureModule } from "@/shared/infrastructure/infrastructure.module";

// import use cases
import { FindAllUsersUseCase } from "./use-case/find-all.use-case";
import { CreateUserUseCase } from "./use-case/create.use-case";
import { FindUserIdUseCase } from "./use-case/find-id.use-case";
import { UpdateUserUseCase } from "./use-case/update.use-case";
import { DeleteUserUseCase } from "./use-case/delete.use-case";

/**
 * User application module
 * @description User application module which provides the user application services
 */
@Module({
  imports: [UserInfrastructureModule, InfrastructureModule, CloudModule],
  providers: [
    FindAllUsersUseCase,
    CreateUserUseCase,
    FindUserIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [
    FindAllUsersUseCase,
    CreateUserUseCase,
    FindUserIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserApplicationModule {}
