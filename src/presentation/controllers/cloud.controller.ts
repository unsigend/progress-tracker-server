// import dependencies
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";

// import dtos
import { FileDeleteRequestDto } from "@/presentation/dtos/cloud/file-delete.request.dto";

// import use cases
import { UploadFileUseCase } from "@/application/use-cases/cloud/upload-file.use-case";
import { DeleteFileUseCase } from "@/application/use-cases/cloud/delete-file.use-case";
import { UploadImageUseCase } from "@/application/use-cases/cloud/upload-image.use-case";
import { UploadAvatarUseCase } from "@/application/use-cases/cloud/upload-avatar.use-case";

// import value objects
import { FileValueObject } from "@domain/value-objects/common/file.vo";
import { UrlValueObject } from "@domain/value-objects/common/url.vo";
import { ImageValueObject } from "@domain/value-objects/common/image.vo";

/**
 * Cloud controller
 * @description Handles cloud storage operations
 */
@ApiTags("cloud")
@Controller("cloud")
export class CloudController {
  constructor(
    private readonly uploadFileUseCase: UploadFileUseCase,
    private readonly deleteFileUseCase: DeleteFileUseCase,
    private readonly uploadImageUseCase: UploadImageUseCase,
    private readonly uploadAvatarUseCase: UploadAvatarUseCase,
  ) {}

  /**
   * Upload a file to cloud storage
   */
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileObject: FileValueObject = new FileValueObject(
      file.buffer,
      file.mimetype,
    );
    // upload the file to the cloud
    const urlObject: UrlValueObject =
      await this.uploadFileUseCase.execute(fileObject);

    // return the URL of the uploaded file
    return { url: urlObject.getValue() };
  }

  /**
   * Upload an image to cloud storage
   */
  @Post("upload/image")
  @UseInterceptors(FileInterceptor("image"))
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    const imageObject: ImageValueObject = new ImageValueObject(
      image.buffer,
      image.mimetype,
    );
    // upload the image to the cloud
    const urlObject: UrlValueObject =
      await this.uploadImageUseCase.execute(imageObject);

    // return the URL of the uploaded image
    return { url: urlObject.getValue() };
  }

  /**
   * Upload an avatar image to cloud storage
   */
  @Post("upload/avatar")
  @UseInterceptors(FileInterceptor("avatar"))
  async uploadAvatar(@UploadedFile() avatar: Express.Multer.File) {
    const avatarObject: ImageValueObject = new ImageValueObject(
      avatar.buffer,
      avatar.mimetype,
    );
    // upload the avatar to the cloud
    const urlObject: UrlValueObject =
      await this.uploadAvatarUseCase.execute(avatarObject);

    // return the URL of the uploaded avatar
    return { url: urlObject.getValue() };
  }

  /**
   * Delete a file from cloud storage
   */
  @Delete("delete")
  async deleteFile(@Body() fileDeleteRequestDto: FileDeleteRequestDto) {
    // create the URL value object
    const urlObject: UrlValueObject = new UrlValueObject(
      fileDeleteRequestDto.url,
    );
    // delete the file from the cloud
    await this.deleteFileUseCase.execute(urlObject);

    // return the success response
    return { success: true };
  }
}
