// import dependencies
import {
  RECORDING_REPOSITORY_TOKEN,
  type IRecordingRepository,
} from "@/modules/reading/domain/repositories/recording.repository";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { Inject, Injectable } from "@nestjs/common";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { RecordingEntity } from "@/modules/reading/domain/entities/recording.entity";

/**
 * Reading recording detail use case
 * @description Reading recording detail use case which is used to handle the reading recording detail requests.
 */
@Injectable()
export class ReadingRecordingDetailUseCase {
  constructor(
    @Inject(RECORDING_REPOSITORY_TOKEN)
    private readonly recordingRepository: IRecordingRepository,
  ) {}

  /**
   * Execute the reading recording detail use case
   * @param userId - The user id
   * @param startDate - The start date
   * @param endDate - The end date
   * @param limit - The limit
   * @param page - The page
   * @param sort - The sort
   * @param order - The order
   * @returns The recordings and the total count of the recordings
   */
  public async execute(
    userId: ObjectIdValueObject,
    startDate?: Date | null,
    endDate?: Date | null,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: RecordingEntity[]; totalCount: number }> {
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
    const query: QueryBase = new QueryBase(
      filters,
      FilterLogic.AND,
      limit,
      page,
      sort ?? "date",
      order,
    );

    // find the recordings
    const { data, totalCount } = await this.recordingRepository.findByUserId(
      userId,
      query,
    );

    // return the recordings and the total count of the recordings
    return { data, totalCount };
  }
}
