// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import interfaces
import type { ICloud } from "@domain/services/cloud.interface";

// import tokens
import { CLOUD_TOKEN } from "@domain/services/cloud.interface";

// import value objects
import { UrlValueObject } from "@domain/value-objects/common/url.vo";

/**
 * Delete file use case
 * @description Delete file use case
 */
@Injectable()
export class DeleteFileUseCase {
  constructor(
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
  ) {}

  /**
   * Execute the delete file use case
   * @description Execute the delete file use case
   * @param url - The URL of the file to be deleted
   * @returns void
   */
  async execute(url: UrlValueObject): Promise<void> {
    // delete the file from the cloud
    await this.cloudService.delete(url);
  }
}
