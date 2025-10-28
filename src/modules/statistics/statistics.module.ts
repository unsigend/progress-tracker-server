// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { StatisticsApplicationModule } from "./application/application.module";
import { StatisticsPresentationModule } from "./presentation/presentation.module";

/**
 * Statistics module
 * @description Statistics module which is used to handle the statistics requests.
 */
@Module({
  imports: [StatisticsApplicationModule, StatisticsPresentationModule],
  exports: [StatisticsApplicationModule, StatisticsPresentationModule],
})
export class StatisticsModule {}
