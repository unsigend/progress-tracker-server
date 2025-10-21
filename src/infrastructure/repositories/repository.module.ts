// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@/infrastructure/database/database.module";

// import repositories
import { UserRepository } from "@/infrastructure/repositories/user.repository";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";

/**
 * Repository module
 * @description Repository module
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY_TOKEN],
})
export class RepositoryModule {}
