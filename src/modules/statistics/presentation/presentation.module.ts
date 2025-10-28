// import dependencies
import { Module } from "@nestjs/common";

// import controllers
import { StatisticsController } from "./controllers/statistics.controller";
import { StatisticsApplicationModule } from "../application/application.module";

/**
 * Statistics presentation module
 * @description Statistics presentation module which is used to handle the statistics requests.
 */
@Module({
  imports: [StatisticsApplicationModule],
  controllers: [StatisticsController],
})
export class StatisticsPresentationModule {}
