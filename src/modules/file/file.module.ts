// import dependencies
import { Module } from "@nestjs/common";
// import modules
import { S3Module } from "@modules/S3/S3.module";
// import services
import { S3Service } from "@modules/S3/S3.service";
// import controllers
import { FileController } from "@modules/file/file.controller";

@Module({
  imports: [S3Module],
  providers: [S3Service],
  controllers: [FileController],
})
export class FileModule {}
