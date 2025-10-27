// import dependencies
import type { FileValueObject } from "@shared/domain/value-object/file.vo";
import type { UrlValueObject } from "@shared/domain/value-object/url.vo";

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
   * Delete a file from the cloud
   * @description Delete a file from the cloud
   * @param url - The URL of the file to be deleted
   * @returns void
   */
  delete(url: UrlValueObject): Promise<void>;
}
