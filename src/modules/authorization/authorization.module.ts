// import dependencies
import { Module } from "@nestjs/common";

// import services
import { AuthorizationService } from "@modules/authorization/authorization.service";

@Module({
  imports: [],
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
