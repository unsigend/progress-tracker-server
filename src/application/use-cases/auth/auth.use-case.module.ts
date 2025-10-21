// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { InfrastructureModule } from "@infrastructure/infrastructure.module";

// import use cases
import { RegisterUseCase } from "@/application/use-cases/auth/register.use-case";

/**
 * Auth use case module
 * @description Auth use case module
 */
@Module({
  imports: [InfrastructureModule],
  providers: [RegisterUseCase],
  exports: [RegisterUseCase],
})
export class AuthUseCaseModule {}
