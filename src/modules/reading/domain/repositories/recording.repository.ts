// import dependencies
import { IBaseRepository } from "@shared/domain/repositories/base.repository";
import { RecordingEntity } from "../entities/recording.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";

/**
 * Recording repository token
 * @description Recording repository token which is used to inject the recording repository.
 */
export const RECORDING_REPOSITORY_TOKEN = Symbol("RECORDING_REPOSITORY_TOKEN");

/**
 * Recording repository interface
 * @description Recording repository which is used to store the recording information.
 */
export interface IRecordingRepository extends IBaseRepository<RecordingEntity> {
  /**
   * Find recordings by user book id
   * @param userBookId - The user book id
   * @returns The recordings and the total count of the recordings
   */
  findByUserBookId(
    userBookId: ObjectIdValueObject,
  ): Promise<{ data: RecordingEntity[]; totalCount: number }>;

  /**
   * Delete recordings by user book id
   * @param userBookId - The user book id
   * @returns True if the recordings were deleted, false otherwise
   */
  deleteByUserBookId(userBookId: ObjectIdValueObject): Promise<boolean>;
}
