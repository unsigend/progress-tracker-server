// import dependencies
import { Module } from "@nestjs/common";

// import use cases
import { UploadImageUseCase } from "./upload-image.use-case";
import { UploadFileUseCase } from "./upload-file.use-case";
import { UploadAvatarUseCase } from "./upload-avatar.use-case";
import { DeleteFileUseCase } from "./delete-file.use-case";

// import modules
import { InfrastructureModule } from "@infrastructure/infrastructure.module";

/**
 * Cloud use case module
 * @description Cloud use case module
 */
@Module({
  imports: [InfrastructureModule],
  providers: [
    UploadImageUseCase,
    UploadFileUseCase,
    UploadAvatarUseCase,
    DeleteFileUseCase,
  ],
  exports: [
    UploadImageUseCase,
    UploadFileUseCase,
    UploadAvatarUseCase,
    DeleteFileUseCase,
  ],
})
export class CloudUseCaseModule {}
