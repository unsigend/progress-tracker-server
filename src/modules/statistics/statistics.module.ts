// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@modules/database/database.module";

// import services
import { StatisticsService } from "@modules/statistics/statistics.service";

// import controllers
import { StatisticsController } from "@modules/statistics/statistics.controller";

@Module({
  imports: [DatabaseModule],
  providers: [StatisticsService],
  controllers: [StatisticsController],
  exports: [StatisticsService],
})
export class StatisticsModule {}
