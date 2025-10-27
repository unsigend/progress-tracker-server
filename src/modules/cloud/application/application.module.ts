// import dependencies
import { Module } from "@nestjs/common";

// import use cases
import { UploadFileUseCase } from "./use-case/upload-file.use-case";
import { DeleteFileUseCase } from "./use-case/delete-file.use-case";
import { UploadImageUseCase } from "./use-case/upload-image.use-case";
import { UploadAvatarUseCase } from "./use-case/upload-avatar.use-case";

// import infrastructure module
import { CloudInfrastructureModule } from "../infrastructure/infrastructure.module";
import { InfrastructureModule } from "@/shared/infrastructure/infrastructure.module";

/**
 * Cloud application module
 * @description Cloud application module which provides the cloud application services
 */
@Module({
  imports: [CloudInfrastructureModule, InfrastructureModule],
  providers: [
    UploadFileUseCase,
    DeleteFileUseCase,
    UploadImageUseCase,
    UploadAvatarUseCase,
  ],
  exports: [
    UploadFileUseCase,
    DeleteFileUseCase,
    UploadImageUseCase,
    UploadAvatarUseCase,
  ],
})
export class CloudApplicationModule {}
