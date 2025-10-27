// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { CloudInfrastructureModule } from "./infrastructure/infrastructure.module";
import { CloudPresentationModule } from "./presentation/presentation.module";

/**
 * Cloud module
 * @description Cloud module which provides the cloud services
 */
@Module({
  imports: [CloudInfrastructureModule, CloudPresentationModule],
  exports: [CloudInfrastructureModule, CloudPresentationModule],
})
export class CloudModule {}
