// import dependencies
import { Inject } from "@nestjs/common";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { ImageValueObject } from "@/shared/domain/value-object/image.vo";
import { IMAGE_COMPRESSOR_TOKEN } from "@shared/domain/services/image-compress.service";
import type { IImageCompress } from "@shared/domain/services/image-compress.service";

/**
 * Upload image use case
 * @description Upload image use case which is used to upload an image to the cloud.
 */
export class UploadImageUseCase {
  /**
   * Constructor for UploadImageUseCase
   * @param cloudService - The cloud service
   * @param imageCompressor - The image compressor
   */
  constructor(
    @Inject(CLOUD_TOKEN) private readonly cloudService: ICloud,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
  ) {}

  /**
   * Execute the upload image use case
   * @param image - The image to upload
   * @returns The URL of the uploaded image
   */
  public async execute(image: Express.Multer.File): Promise<UrlValueObject> {
    // compress the image
    const compressedImage: ImageValueObject =
      await this.imageCompressor.compressImage(
        new ImageValueObject(image.buffer, image.mimetype),
      );

    // upload the compressed image to the cloud
    return this.cloudService.upload(compressedImage);
  }
}
