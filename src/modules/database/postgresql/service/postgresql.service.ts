// import dependencies
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

/**
 * PostgreSQL Database Access service
 * @description PostgreSQL Database Access service
 * @extends PrismaClient
 */
@Injectable()
export class PostgreSQLService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * On module init
   * @description On module init
   */
  async onModuleInit(): Promise<void> {
    // connect to the database
    await this.$connect();
  }

  /**
   * On module destroy
   * @description On module destroy
   */
  async onModuleDestroy(): Promise<void> {
    // disconnect from the database
    await this.$disconnect();
  }
}
