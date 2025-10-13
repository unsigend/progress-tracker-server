// import dependencies
import { Injectable } from "@nestjs/common";
import sharp from "sharp";

// import dto
import { ImageCompressOptionsDto } from "@modules/images/dto/image-compress-options.dto";

@Injectable()
export class ImagesService {
  constructor() {}

  /**
   * Compress an image
   * @param buffer - The buffer of the image
   * @param options - The options for the compression
   * @returns The compressed image
   */
  async compressImage(
    buffer: Buffer,
    options: ImageCompressOptionsDto,
  ): Promise<Buffer> {
    try {
      let sharpInstance = sharp(buffer);

      // Apply resize if dimensions are specified
      if (options.width || options.height) {
        sharpInstance = sharpInstance.resize(options.width, options.height, {
          fit: "inside",
          withoutEnlargement: true,
        });
      }

      // Apply format conversion with quality
      let compressedImage: Buffer;

      if (options.format === "jpeg") {
        compressedImage = await sharpInstance
          .toFormat("jpeg", { quality: options.quality })
          .toBuffer();
      } else if (options.format === "webp") {
        compressedImage = await sharpInstance
          .toFormat("webp", { quality: options.quality })
          .toBuffer();
      } else if (options.format === "png") {
        compressedImage = await sharpInstance
          .toFormat("png", {
            compressionLevel: Math.round((100 - options.quality!) / 10),
          })
          .toBuffer();
      } else {
        compressedImage = await sharpInstance
          .toFormat(options.format!)
          .toBuffer();
      }

      return compressedImage;
    } catch (error) {
      throw new Error(
        `Image compression failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Compress an avatar image
   * @param buffer - The buffer of the avatar image
   * @returns The compressed avatar image
   */
  async compressAvatar(buffer: Buffer): Promise<Buffer> {
    const resultImage = await sharp(buffer)
      .resize(400, 400, {
        fit: "cover",
        position: "center",
      })
      .toFormat("jpeg", { quality: 85 })
      .toBuffer();

    return resultImage;
  }
}
