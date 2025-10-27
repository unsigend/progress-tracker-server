// import dependencies
import { Inject } from "@nestjs/common";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { ImageValueObject } from "@/shared/domain/value-object/image.vo";
import { IMAGE_COMPRESSOR_TOKEN } from "@shared/domain/services/image-compress.service";
import type { IImageCompress } from "@shared/domain/services/image-compress.service";

/**
 * Upload avatar use case
 * @description Upload avatar use case which is used to upload an avatar to the cloud.
 */
export class UploadAvatarUseCase {
  /**
   * Constructor for UploadAvatarUseCase
   * @param cloudService - The cloud service
   * @param imageCompressor - The image compressor
   */
  constructor(
    @Inject(CLOUD_TOKEN) private readonly cloudService: ICloud,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
  ) {}

  /**
   * Execute the upload avatar use case
   * @param image - The image to upload
   * @returns The URL of the uploaded image
   */
  public async execute(image: Express.Multer.File): Promise<UrlValueObject> {
    // compress the avatar image
    const compressedAvatar: ImageValueObject =
      await this.imageCompressor.compressAvatar(
        new ImageValueObject(image.buffer, image.mimetype),
      );

    // upload the compressed avatar to the cloud
    return this.cloudService.upload(compressedAvatar);
  }
}
