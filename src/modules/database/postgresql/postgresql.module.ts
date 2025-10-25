// import dependencies
import { Module } from "@nestjs/common";

// import services
import { PostgreSQLService } from "../postgresql/service/postgresql.service";
import { PrismaService } from "../postgresql/service/prisma.service";

/**
 * PostgreSQL module
 * @description PostgreSQL module which provides the PostgreSQL service
 */
@Module({
  providers: [PostgreSQLService, PrismaService],
  exports: [PostgreSQLService, PrismaService],
})
export class PostgresqlModule {}
