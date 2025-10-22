// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { InfrastructureModule } from "@infrastructure/infrastructure.module";

// import use cases
import { RegisterUseCase } from "@/application/use-cases/auth/register.use-case";
import { LoginUseCase } from "@/application/use-cases/auth/login.use-case";
import { EmailCheckUseCase } from "@/application/use-cases/auth/email-check.use-case";

/**
 * Auth use case module
 * @description Auth use case module
 */
@Module({
  imports: [InfrastructureModule],
  providers: [RegisterUseCase, LoginUseCase, EmailCheckUseCase],
  exports: [RegisterUseCase, LoginUseCase, EmailCheckUseCase],
})
export class AuthUseCaseModule {}
