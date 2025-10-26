// import dependencies
import sharp from "sharp";
import { Injectable } from "@nestjs/common";

// import shared
import { IImageCompress } from "@shared/domain/services/image-compress.service";
import { ImageValueObject } from "@shared/domain/value-object/image.vo";
import { ValidationException } from "@shared/domain/exceptions/validation.exception";

/**
 * Image Compress Service
 * @description Image Compress Service
 */
@Injectable()
export class ImageCompressService implements IImageCompress {
  private readonly maxWidth: number = 1920;
  private readonly maxHeight: number = 1080;
  constructor() {}

  /**
   * Compress an image
   * @description Compress an image
   * @param image - The image to be compressed
   * @returns The compressed image
   */
  async compressImage(image: ImageValueObject): Promise<ImageValueObject> {
    const buffer: Buffer = image.getBuffer();
    const mimeType: string = image.getMimeType();

    let compressedBuffer: Buffer = buffer;

    // compress the image based on the mime type
    switch (mimeType) {
      case "image/jpeg":
        compressedBuffer = await sharp(buffer)
          .jpeg({ quality: 80, progressive: true })
          .resize(this.maxWidth, this.maxHeight, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .toBuffer();
        break;
      case "image/png":
        compressedBuffer = await sharp(buffer)
          .png({ quality: 80, compressionLevel: 9 })
          .resize(this.maxWidth, this.maxHeight, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .toBuffer();
        break;
      case "image/gif":
        compressedBuffer = await sharp(buffer, { animated: true })
          .webp({ quality: 80 })
          .resize(this.maxWidth, this.maxHeight, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .toBuffer();
        return new ImageValueObject(compressedBuffer, "image/webp");
      case "image/webp":
        compressedBuffer = await sharp(buffer)
          .webp({ quality: 80 })
          .resize(this.maxWidth, this.maxHeight, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .toBuffer();
        break;
      default:
        throw new ValidationException("Invalid image mime type");
    }

    return new ImageValueObject(compressedBuffer, mimeType);
  }

  /**
   * Compress an avatar image
   * @description Compress an avatar image
   * @param image - The avatar image to be compressed
   * @returns The compressed avatar image
   */
  async compressAvatar(image: ImageValueObject): Promise<ImageValueObject> {
    const buffer: Buffer = image.getBuffer();

    // square crop and smaller size
    const compressedBuffer: Buffer = await sharp(buffer)
      .resize(256, 256, { fit: "cover", position: "center" })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer();

    return new ImageValueObject(compressedBuffer, "image/jpeg");
  }
}
