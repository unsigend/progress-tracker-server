// import dependencies
import { Injectable, OnModuleInit } from "@nestjs/common";

// import PrismaClient
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
