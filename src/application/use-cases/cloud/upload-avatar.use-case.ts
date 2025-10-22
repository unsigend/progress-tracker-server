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
 * Upload avatar use case
 * @description Upload avatar use case
 */
@Injectable()
export class UploadAvatarUseCase {
  constructor(
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
    @Inject(IMAGE_COMPRESSOR_TOKEN)
    private readonly imageCompressor: IImageCompress,
  ) {}

  /**
   * Execute the upload avatar use case
   * @description Execute the upload avatar use case
   * @param avatar - The avatar image to be uploaded
   * @returns The URL value object of the uploaded avatar
   */
  async execute(avatar: ImageValueObject): Promise<UrlValueObject> {
    // compress the avatar
    const compressedAvatar: ImageValueObject =
      await this.imageCompressor.compressAvatar(avatar);

    // upload the compressed avatar to the cloud
    return this.cloudService.upload(compressedAvatar);
  }
}
