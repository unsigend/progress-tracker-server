// Reading Record Repository Interface

import { ReadingRecord } from "@/domain/entities/reading-record.entity";

/**
 * Reading Record Query
 * @param userBookId - The id of the user book
 * @param startDate - The start date inclusive
 * @param endDate - The end date inclusive
 * @param date - The date
 * @param page - The page number
 * @param limit - The number of results per page
 * @param sort - The field to sort by
 * @param order - The order to sort by
 */
export interface ReadingRecordQueryInterface {
  userBookId?: string;
  startDate?: Date;
  endDate?: Date;
  date?: Date;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface ReadingRecordRepositoryInterface {
  /**
   * Create a reading record
   * @param readingRecord - The reading record to create
   * @returns The created reading record
   */
  create(readingRecord: ReadingRecord): Promise<ReadingRecord>;

  /**
   * Find all reading records
   * @param query - The query
   * @returns The reading records and the total number of reading records
   */
  findAll(
    query?: ReadingRecordQueryInterface,
  ): Promise<{ readingRecords: ReadingRecord[]; totalCount: number }>;

  /**
   * Find a reading record by id
   * @param id - The id of the reading record
   * @returns The reading record or null if the reading record is not found
   */
  findById(id: string): Promise<ReadingRecord | null>;

  /**
   * Update a reading record
   * @param readingRecord - The reading record to update
   * @returns The updated reading record or null if the reading record is not found
   */
  update(readingRecord: ReadingRecord): Promise<ReadingRecord | null>;

  /**
   * Delete a reading record
   * @param id - The id of the reading record
   * @returns The deleted reading record or null if the reading record is not found
   */
  delete(id: string): Promise<ReadingRecord | null>;
}
