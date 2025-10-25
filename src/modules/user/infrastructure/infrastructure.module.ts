// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@/modules/database/database.module";

// import tokens
import { USER_REPOSITORY_TOKEN } from "../domain/repositories/user.repository";
import { PASSWORD_HASHER_TOKEN } from "../domain/services/password-hash.service";

// import services
import { BcryptPasswordHasherService } from "./services/bcrypt-password-hasher/bcrypt-password-hasher.service";

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
  ],
  exports: [USER_REPOSITORY_TOKEN],
})
export class UserInfrastructureModule {}
