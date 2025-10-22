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
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from "@nestjs/swagger";

// import dtos
import { UploadFileRequestDto } from "@/presentation/dtos/cloud/upload-file.request.dto";
import { FileResponseDto } from "@/presentation/dtos/cloud/file.response.dto";
import { UploadImageRequestDto } from "@/presentation/dtos/cloud/upload-image.request.dto";
import { UploadAvatarRequestDto } from "@/presentation/dtos/cloud/upload-avatar.request.dto";
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
 * @description Cloud controller
 */
@Controller("cloud")
export class CloudController {
  constructor(
    private readonly uploadFileUseCase: UploadFileUseCase,
    private readonly deleteFileUseCase: DeleteFileUseCase,
    private readonly uploadImageUseCase: UploadImageUseCase,
    private readonly uploadAvatarUseCase: UploadAvatarUseCase,
  ) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  @ApiBody({ type: UploadFileRequestDto })
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Upload a file" })
  @ApiResponse({
    status: 200,
    description: "File uploaded successfully",
    type: FileResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
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

  @Post("upload/image")
  @UseInterceptors(FileInterceptor("image"))
  @ApiBody({ type: UploadImageRequestDto })
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Upload an image" })
  @ApiResponse({
    status: 200,
    description: "Image uploaded successfully",
    type: FileResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
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

  @Post("upload/avatar")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiBody({ type: UploadAvatarRequestDto })
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Upload an avatar" })
  @ApiResponse({
    status: 200,
    description: "Avatar uploaded successfully",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
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

  @Delete("delete")
  @ApiBody({ type: FileDeleteRequestDto })
  @ApiOperation({ summary: "Delete a file" })
  @ApiResponse({ status: 200, description: "File deleted successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
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
