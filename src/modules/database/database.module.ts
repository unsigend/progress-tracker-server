// import dependencies
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// import services
import { PrismaService } from "@modules/database/prisma.service";

// import config
import databaseConfig from "@modules/database/config/database.config";

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
