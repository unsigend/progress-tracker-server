// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import interfaces
import type { ICloud } from "@domain/services/cloud.interface";

// import tokens
import { CLOUD_TOKEN } from "@domain/services/cloud.interface";

// import value objects
import { FileValueObject } from "@domain/value-objects/common/file.vo";
import { UrlValueObject } from "@domain/value-objects/common/url.vo";

/**
 * Upload file use case
 * @description Upload file use case
 */
@Injectable()
export class UploadFileUseCase {
  constructor(
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
  ) {}

  /**
   * Execute the upload file use case
   * @description Execute the upload file use case
   * @param file - The file to be uploaded
   * @returns The URL value object of the uploaded file
   */
  async execute(file: FileValueObject): Promise<UrlValueObject> {
    return this.cloudService.upload(file);
  }
}
