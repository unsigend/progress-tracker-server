// import dependencies
import { Module } from "@nestjs/common";

// import services
import { BcryptPasswordHasherService } from "@/infrastructure/services/password-hasher/bcrypt-password-hasher.service";

// import tokens
import { PASSWORD_HASHER_TOKEN } from "@domain/services/password-hasher.interface";

/**
 * Services module
 * @description Services module
 */
@Module({
  providers: [
    {
      provide: PASSWORD_HASHER_TOKEN,
      useClass: BcryptPasswordHasherService,
    },
  ],
  exports: [PASSWORD_HASHER_TOKEN],
})
export class ServicesModule {}
