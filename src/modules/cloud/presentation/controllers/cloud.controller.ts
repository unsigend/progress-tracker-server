// import dependencies
import { Controller, Post, UploadedFile, Delete, Body } from "@nestjs/common";
import { UrlValueObject } from "@shared/domain/value-object/url.vo";
import { UploadImageUseCase } from "../../application/use-case/upload-image.use-case";
import { DeleteFileUseCase } from "../../application/use-case/delete-file.use-case";
import { UploadFileUseCase } from "../../application/use-case/upload-file.use-case";
import { UploadAvatarUseCase } from "../../application/use-case/upload-avatar.use-case";
import { ApiFileUpload } from "@shared/platforms/decorators/api-file-upload.decorator";
import { FileDeleteRequestDto } from "../dtos/file-delete.request.dto";

/**
 * Cloud controller
 * @description Cloud controller which provides the cloud services
 */
@Controller("cloud")
export class CloudController {
  /**
   * Constructor
   * @param uploadImageUseCase - The upload image use case
   * @param uploadFileUseCase - The upload file use case
   * @param deleteFileUseCase - The delete file use case
   * @param uploadAvatarUseCase - The upload avatar use case
   */
  constructor(
    private readonly uploadImageUseCase: UploadImageUseCase,
    private readonly uploadFileUseCase: UploadFileUseCase,
    private readonly deleteFileUseCase: DeleteFileUseCase,
    private readonly uploadAvatarUseCase: UploadAvatarUseCase,
  ) {}

  /**
   * Upload a file to the cloud
   * @param file - The file to be uploaded
   * @returns The URL of the uploaded file
   */
  @Post("upload")
  @ApiFileUpload({
    fieldName: "file",
    summary: "Upload a file to cloud storage",
  })
  public async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const url: UrlValueObject = await this.uploadFileUseCase.execute(file);
    return { url: url.getUrl() };
  }

  /**
   * Upload an image to the cloud
   * @param image - The image to be uploaded
   * @returns The URL of the uploaded image
   */
  @Post("upload/image")
  @ApiFileUpload({
    fieldName: "image",
    summary: "Upload an image to cloud storage",
  })
  public async uploadImage(
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ url: string }> {
    const url: UrlValueObject = await this.uploadImageUseCase.execute(image);
    return { url: url.getUrl() };
  }

  /**
   * Upload an avatar to the cloud
   * @param avatar - The avatar to be uploaded
   * @returns The URL of the uploaded avatar
   */
  @Post("upload/avatar")
  @ApiFileUpload({
    fieldName: "avatar",
    summary: "Upload an avatar to cloud storage",
  })
  public async uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<{ url: string }> {
    const url: UrlValueObject = await this.uploadAvatarUseCase.execute(avatar);
    return { url: url.getUrl() };
  }

  /**
   * Delete a file from the cloud
   * @param url - The URL of the file to delete
   * @returns void
   */
  @Delete("delete")
  public async delete(
    @Body() body: FileDeleteRequestDto,
  ): Promise<{ success: boolean }> {
    await this.deleteFileUseCase.execute(new UrlValueObject(body.url));
    return { success: true };
  }
}
