// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { RepositoryModule } from "@/infrastructure/repositories/repository.module";
import { ServicesModule } from "@/infrastructure/services/services.module";

/**
 * Infrastructure module
 * @description Infrastructure module
 */
@Module({
  imports: [RepositoryModule, ServicesModule],
  exports: [RepositoryModule, ServicesModule],
})
export class InfrastructureModule {}
