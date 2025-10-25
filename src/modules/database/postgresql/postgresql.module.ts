// import dependencies
import { Module } from "@nestjs/common";

// import services
import { PostgreSQLService } from "../postgresql/service/postgresql.service";

/**
 * PostgreSQL module
 * @description PostgreSQL module which provides the PostgreSQL service
 */
@Module({
  providers: [PostgreSQLService],
  exports: [PostgreSQLService],
})
export class PostgresqlModule {}
