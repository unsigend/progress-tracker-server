// Storage Interface

export interface IStorageService {
  /**
   * Upload a file to the storage
   * @param buffer - The buffer of the file
   * @param mimeType - The mime type of the file
   * @param folder - Optional folder to upload the file to
   * @returns The url of the uploaded file
   */
  upload(buffer: Buffer, mimeType: string, folder?: string): Promise<string>;

  /**
   * Delete a file from the storage
   * @param url - The url of the file to delete
   */
  delete(url: string): Promise<void>;
}
