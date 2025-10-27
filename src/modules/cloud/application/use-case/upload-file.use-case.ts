// import dependencies
import { Inject } from "@nestjs/common";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { FileValueObject } from "@/shared/domain/value-object/file.vo";

/**
 * Upload file use case
 * @description Upload file use case which is used to upload a file to the cloud.
 */
export class UploadFileUseCase {
  /**
   * Constructor for UploadFileUseCase
   * @param cloudService - The cloud service
   */
  constructor(@Inject(CLOUD_TOKEN) private readonly cloudService: ICloud) {}

  /**
   * Execute the upload file use case
   * @param file - The file to upload
   * @returns The URL of the uploaded file
   */
  public async execute(file: Express.Multer.File): Promise<UrlValueObject> {
    return this.cloudService.upload(
      new FileValueObject(file.buffer, file.mimetype),
    );
  }
}
