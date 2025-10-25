// import dependencies
import { Module } from "@nestjs/common";

// import services
import { ServicesModule } from "./services/services.module";

/**
 * Infrastructure module
 * @description Infrastructure module which provides the infrastructure services
 */
@Module({
  imports: [ServicesModule],
  exports: [ServicesModule],
})
export class InfrastructureModule {}
