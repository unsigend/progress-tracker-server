// import dependencies
import { Module } from "@nestjs/common";

// import services
import { MongoDBService } from "./service/mongodb.service";

/**
 * MongoDB module
 * @description MongoDB module which provides the MongoDB service
 */
@Module({
  providers: [MongoDBService],
  exports: [MongoDBService],
})
export class MongoDBModule {}
