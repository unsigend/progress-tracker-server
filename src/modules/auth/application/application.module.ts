// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { UserModule } from "@/modules/user/user.module";
import { UserInfrastructureModule } from "@/modules/user/infrastructure/infrastructure.module";
import { AuthInfrastructureModule } from "../infrastructure/infrastructure.module";

// import use cases
import { RegisterUseCase } from "./use-case/register.use-case";
import { LoginUseCase } from "./use-case/login.use-case";
import { EmailCheckUseCase } from "./use-case/email-check.use-case";
import { ConnectUserUseCase } from "./use-case/connect.use-case";

/**
 * Auth application module
 * @description Auth application module which provides the auth application services
 */
@Module({
  imports: [UserModule, UserInfrastructureModule, AuthInfrastructureModule],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    EmailCheckUseCase,
    ConnectUserUseCase,
  ],
  exports: [
    RegisterUseCase,
    LoginUseCase,
    EmailCheckUseCase,
    ConnectUserUseCase,
  ],
})
export class AuthApplicationModule {}
