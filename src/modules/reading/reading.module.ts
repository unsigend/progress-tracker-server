// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { ReadingPresentationModule } from "./presentation/presentation.module";
import { ReadingApplicationModule } from "./application/application.module";

/**
 * Reading module
 * @description Reading module which provides the reading services
 */
@Module({
  imports: [ReadingPresentationModule, ReadingApplicationModule],
  exports: [ReadingPresentationModule, ReadingApplicationModule],
})
export class ReadingModule {}
