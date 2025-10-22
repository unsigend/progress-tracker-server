// import dependencies
import type { FileValueObject } from "@domain/value-objects/common/file.vo";
import type { UrlValueObject } from "@domain/value-objects/common/url.vo";

/**
 * Cloud token
 * @description Cloud token
 */
export const CLOUD_TOKEN = Symbol("CLOUD_TOKEN");

/**
 * Cloud interface
 * @description Cloud interface
 */
export interface ICloud {
  /**
   * Upload a file to the cloud and return the URL
   * @description Upload a file to the cloud
   * @param file - The file to be uploaded
   * @returns The URL value object of the uploaded file
   */
  upload(file: FileValueObject): Promise<UrlValueObject>;

  /**
   * Delete an image from the cloud
   * @description Delete an image from the cloud
   * @param url - The URL of the image to be deleted
   * @returns void
   */
  deleteImage(url: UrlValueObject): Promise<void>;
}
