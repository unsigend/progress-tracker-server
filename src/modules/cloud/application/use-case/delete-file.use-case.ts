// import dependencies
import { Inject } from "@nestjs/common";
import { CLOUD_TOKEN, type ICloud } from "@/modules/cloud/domain/cloud.service";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";

/**
 * Delete file use case
 * @description Delete file use case which is used to delete a file from the cloud.
 */
export class DeleteFileUseCase {
  /**
   * Constructor for DeleteFileUseCase
   * @param cloudService - The cloud service
   */
  constructor(@Inject(CLOUD_TOKEN) private readonly cloudService: ICloud) {}

  /**
   * Execute the delete file use case
   * @param url - The URL of the file to delete
   * @returns void
   */
  public async execute(url: UrlValueObject): Promise<void> {
    return this.cloudService.delete(url);
  }
}
