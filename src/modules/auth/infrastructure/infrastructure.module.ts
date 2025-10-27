// import dependencies
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TOKEN_SERVICE_TOKEN } from "../domain/services/token.service";
import { JwtTokenService } from "./services/jwt-token/jwt-token.service";
import { UserInfrastructureModule } from "@/modules/user/infrastructure/infrastructure.module";

/**
 * Auth infrastructure module
 * @description Auth infrastructure module which provides the auth infrastructure services
 */
@Module({
  imports: [JwtModule, UserInfrastructureModule],
  providers: [
    {
      provide: TOKEN_SERVICE_TOKEN,
      useClass: JwtTokenService,
    },
  ],
  exports: [TOKEN_SERVICE_TOKEN],
})
export class AuthInfrastructureModule {}
