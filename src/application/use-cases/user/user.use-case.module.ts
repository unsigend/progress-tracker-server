// import dependencies
import { Module } from "@nestjs/common";

// import use cases
import { RegisterUserUseCase } from "@/application/use-cases/user/register-user.use-case";

// import modules
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";

/**
 * User use case module
 * @description User use case module
 */
@Module({
  imports: [InfrastructureModule],
  providers: [RegisterUserUseCase],
  exports: [RegisterUserUseCase],
})
export class UserUseCaseModule {}
