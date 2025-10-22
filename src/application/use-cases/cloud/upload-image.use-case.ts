// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import interfaces
import type { ICloud } from "@domain/services/cloud.interface";
import type { IImageCompress } from "@domain/services/image-compress.interface";

// import tokens
import { CLOUD_TOKEN } from "@domain/services/cloud.interface";
import { IMAGE_COMPRESSOR_TOKEN } from "@domain/services/image-compress.interface";

// import value objects
import { ImageValueObject } from "@domain/value-objects/common/image.vo";
import { UrlValueObject } from "@domain/value-objects/common/url.vo";

/**
 * Upload image use case
 * @description Upload image use case
 */
@Injectable()
export class UploadImageUseCase {
  constructor(
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
  ) {}

  /**
   * Execute the upload image use case
   * @description Execute the upload image use case
   * @param image - The image to be uploaded
   * @returns The URL value object of the uploaded image
   */
  async execute(image: ImageValueObject): Promise<UrlValueObject> {
    // compress the image
    const compressedImage: ImageValueObject =
      await this.imageCompressor.compressImage(image);

    // upload the compressed image to the cloud
    return this.cloudService.upload(compressedImage);
  }
}
