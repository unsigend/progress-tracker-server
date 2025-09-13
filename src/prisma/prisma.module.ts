// import dependencies
import { Module } from "@nestjs/common";

// import services
import { PrismaService } from "@/prisma/prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
