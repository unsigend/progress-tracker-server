// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { PostgresqlModule } from "./postgresql/postgresql.module";
import { MongoDBModule } from "./mongodb/mongodb.module";

/**
 * Database module
 * @description Database module which provides the database services
 */
@Module({
  imports: [PostgresqlModule, MongoDBModule],
  exports: [PostgresqlModule, MongoDBModule],
})
export class DatabaseModule {}
