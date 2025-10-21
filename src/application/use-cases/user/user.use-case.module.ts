// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";

/**
 * User use cases module
 * @description User use cases module
 */
@Module({
  imports: [InfrastructureModule],
  providers: [],
  exports: [],
})
export class UserUseCaseModule {}
