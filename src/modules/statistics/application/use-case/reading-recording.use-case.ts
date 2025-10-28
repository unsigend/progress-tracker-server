// import dependencies
import {
  type IRecordingRepository,
  RECORDING_REPOSITORY_TOKEN,
} from "@/modules/reading/domain/repositories/recording.repository";
import { QueryBase } from "@/shared/domain/queries/base.query";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { Inject, Injectable } from "@nestjs/common";

/**
 * Reading recording use case
 * @description Reading recording use case which is used to handle the reading recording requests.
 */
@Injectable()
export class ReadingRecordingUseCase {
  constructor(
    @Inject(RECORDING_REPOSITORY_TOKEN)
    private readonly recordingRepository: IRecordingRepository,
  ) {}

  /**
   * Execute the reading recording use case
   * @returns The reading recording
   */
  public async execute(
    userId: ObjectIdValueObject,
    startDate?: Date | null,
    endDate?: Date | null,
  ): Promise<{
    totalMinutes: number;
    totalPages: number;
    totalRecordings: number;
  }> {
    // build the filter base on the start and end date
    const filters: Filters = [];
    if (startDate && endDate) {
      filters.push({
        field: "date",
        operator: FilterOperator.BETWEEN,
        value: [startDate, endDate],
      });
    }
    // build the query
    const query: QueryBase = new QueryBase(filters, FilterLogic.AND);

    // find the aggregated recordings
    const { totalMinutes, totalPages, totalRecordings } =
      await this.recordingRepository.findAggregated(userId, query);

    // return the aggregated recordings
    return { totalMinutes, totalPages, totalRecordings };
  }
}
