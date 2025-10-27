// import dependencies
import { Inject, Injectable } from "@nestjs/common";
import { RECORDING_REPOSITORY_TOKEN } from "@/modules/reading/domain/repositories/recording.repository";
import { type IRecordingRepository } from "@/modules/reading/domain/repositories/recording.repository";
import { RecordingEntity } from "@/modules/reading/domain/entities/recording.entity";
import { QueryBase } from "@/shared/domain/queries/base.query";
import {
  FilterLogic,
  FilterOperator,
  Filters,
} from "@/shared/domain/queries/filter";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";

/**
 * Find all recordings use case
 * @description Find all recordings use case which is used to find all recordings.
 */
@Injectable()
export class FindAllRecordingsUseCase {
  /**
   * Constructor for FindAllRecordingsUseCase
   * @param recordingRepository - The recording repository
   */
  constructor(
    @Inject(RECORDING_REPOSITORY_TOKEN)
    private readonly recordingRepository: IRecordingRepository,
  ) {}

  /**
   * Execute the find all recordings use case
   * @param userBookId - The user book id
   * @param limit - The limit of the recordings
   * @param page - The page of the recordings
   * @param sort - The sort of the recordings
   * @param order - The order of the recordings
   * @returns The recordings and the total count of the recordings
   */
  public async execute(
    userBookId: ObjectIdValueObject,
    limit?: number,
    page?: number,
    sort?: string,
    order?: "asc" | "desc",
  ): Promise<{ data: RecordingEntity[]; totalCount: number }> {
    const filters: Filters = [];
    filters.push({
      field: "user_book_id",
      operator: FilterOperator.EQUALS,
      value: userBookId.getId(),
    });

    // build the query
    const queryBase: QueryBase = new QueryBase(
      filters,
      FilterLogic.AND,
      limit,
      page,
      sort ?? "date",
      order,
    );

    // find the recordings
    const { data, totalCount } =
      await this.recordingRepository.findAll(queryBase);

    // return the recordings and the total count of the recordings
    return { data, totalCount };
  }
}
