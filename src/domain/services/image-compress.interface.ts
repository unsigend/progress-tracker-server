// import dependencies
import type { ImageValueObject } from "@domain/value-objects/common/image.vo";

/**
 * Image Compressor token
 * @description Image Compressor token
 */
export const IMAGE_COMPRESSOR_TOKEN = Symbol("IMAGE_COMPRESSOR_TOKEN");

/**
 * Image Compressor interface
 * @description Image Compressor interface
 */
export interface IImageCompress {
  /**
   * Compress an image
   * @description Compress an image
   * @param image - The image to be compressed
   * @returns The compressed image
   */
  compressImage(image: ImageValueObject): Promise<ImageValueObject>;

  /**
   * Compress an avatar image
   * @description Compress an avatar image
   * @param image - The avatar image to be compressed
   * @returns The compressed avatar image
   */
  compressAvatar(image: ImageValueObject): Promise<ImageValueObject>;
}
