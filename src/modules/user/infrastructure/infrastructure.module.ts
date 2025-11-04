// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@/modules/database/database.module";

// import tokens
import { USER_REPOSITORY_TOKEN } from "../domain/repositories/user.repository";
import { PASSWORD_HASHER_TOKEN } from "../domain/services/password-hash.service";
import { PERMISSION_POLICY_TOKEN } from "@shared/domain/services/permission-policy.service";

// import services
import { BcryptPasswordHasherService } from "./services/bcrypt-password-hasher/bcrypt-password-hasher.service";
import { UserPermissionPolicyService } from "./services/permission-policy/user-permission-policy.service";

// import repositories
import { UserRepository } from "./repositories/user.repository";

/**
 * User infrastructure module
 * @description User infrastructure module which provides the user infrastructure services
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: PASSWORD_HASHER_TOKEN,
      useClass: BcryptPasswordHasherService,
    },
    {
      provide: PERMISSION_POLICY_TOKEN,
      useClass: UserPermissionPolicyService,
    },
  ],
  exports: [
    USER_REPOSITORY_TOKEN,
    PASSWORD_HASHER_TOKEN,
    PERMISSION_POLICY_TOKEN,
  ],
})
export class UserInfrastructureModule {}
