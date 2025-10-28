// import dependencies
import { IBaseRepository } from "@shared/domain/repositories/base.repository";
import { RecordingEntity } from "../entities/recording.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { QueryBase } from "@/shared/domain/queries/base.query";

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

  /**
   * Find aggregated recordings
   * @param userId - The user id
   * @param query - The query
   * @returns The aggregated recordings
   */
  findAggregated(
    userId: ObjectIdValueObject,
    query: QueryBase,
  ): Promise<{
    totalMinutes: number;
    totalPages: number;
    totalRecordings: number;
  }>;

  /**
   * Find recordings by user id
   * @param userId - The user id
   * @param query - The query
   * @returns The recordings and the total count of the recordings
   */
  findByUserId(
    userId: ObjectIdValueObject,
    query: QueryBase,
  ): Promise<{
    data: RecordingEntity[];
    totalCount: number;
  }>;
}
