// import dependencies
import { Module } from "@nestjs/common";

// import services
import { PostgreSQLService } from "@/infrastructure/database/postgresql/service/postgresql.service";
import { MongoDBService } from "@/infrastructure/database/mongodb/service/mongodb.service";
/**
 * Database Module
 * @description Database Module
 */
@Module({
  imports: [PostgreSQLService, MongoDBService],
  exports: [PostgreSQLService, MongoDBService],
})
export class DatabaseModule {}
