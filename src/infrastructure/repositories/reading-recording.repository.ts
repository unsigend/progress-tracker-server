// import dependencies
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

// import models
import { ReadingRecord as ReadingRecordModel } from "@prisma/client";

// import interfaces
import type { IReadingRecordingRepository } from "@domain/repositories/reading-recording.repository";

// import services
import { PostgreSQLService } from "@/infrastructure/database/postgresql/service/postgresql.service";

// import entities
import { ReadingRecordingEntity } from "@/domain/entities/reading-recording.entity";

// import mappers
import { ReadingRecordingMapper } from "@/infrastructure/mapper/reading-recording.mapper";

// import value objects
import { ObjectIdValueObject } from "@/domain/value-objects/common/object-id.vo";

// import queries
import { ReadingRecordingQuery } from "@domain/repositories/queries/reading-recording.query";

/**
 * Reading recording repository
 * @description Reading recording repository
 */
@Injectable()
export class ReadingRecordingRepository implements IReadingRecordingRepository {
  constructor(private readonly postgresqlService: PostgreSQLService) {}

  /**
   * Save a reading recording updates or creates a new reading recording
   * @description Save a reading recording
   * @param readingRecording - The reading recording to be saved
   */
  async save(readingRecording: ReadingRecordingEntity): Promise<void> {
    // map to the prisma reading recording model
    const readingRecordingModel: ReadingRecordModel =
      ReadingRecordingMapper.toModel(readingRecording);

    // update or create the reading recording
    await this.postgresqlService.readingRecord.upsert({
      where: { id: readingRecordingModel.id },
      update: readingRecordingModel,
      create: readingRecordingModel,
    });
  }

  /**
   * Find a reading recording by id
   * @description Find a reading recording by id
   * @param id - The id of the reading recording to be found
   * @returns The reading recording or null if not found
   */
  async findById(
    id: ObjectIdValueObject,
  ): Promise<ReadingRecordingEntity | null> {
    const readingRecordingModel: ReadingRecordModel | null =
      await this.postgresqlService.readingRecord.findUnique({
        where: { id: id.getValue() },
      });
    return readingRecordingModel
      ? ReadingRecordingMapper.toEntity(readingRecordingModel)
      : null;
  }

  /**
   * Find all reading recordings
   * @description Find all reading recordings
   * @param query - The query to be used to find the reading recordings
   * @returns The reading recordings and total count
   */
  async findAll(query: ReadingRecordingQuery): Promise<{
    readingRecordings: ReadingRecordingEntity[];
    totalCount: number;
  }> {
    const whereClause: Prisma.ReadingRecordWhereInput = {};
    const sortClause: Prisma.ReadingRecordOrderByWithRelationInput = {};

    // build the where clause
    if (query.getUserBookId()) {
      whereClause["user_book_id"] = query.getUserBookId()!.getValue();
    }
    if (query.getDate()) {
      whereClause["date"] = query.getDate()!;
    }

    // build the sort clause
    if (query.getOrder() && query.getSort()) {
      sortClause[query.getSort()] = query.getOrder();
    } else {
      sortClause["createdAt"] = "desc";
    }

    // build the page and limit
    const page = query.getPage() ?? 1;
    const limit = query.getLimit() ?? 10;
    const skip = (page - 1) * limit;

    // get the reading recordings
    const readingRecordings: ReadingRecordModel[] =
      await this.postgresqlService.readingRecord.findMany({
        where: whereClause,
        orderBy: sortClause,
        skip: skip,
        take: limit,
      });

    // get the total count
    const totalCount: number = await this.postgresqlService.readingRecord.count(
      {
        where: whereClause,
      },
    );
    return {
      readingRecordings: readingRecordings.map((readingRecording) =>
        ReadingRecordingMapper.toEntity(readingRecording),
      ),
      totalCount: totalCount,
    };
  }

  /**
   * Delete a reading recording
   * @description Delete a reading recording
   * @param id - The id of the reading recording to be deleted
   */
  async delete(id: ObjectIdValueObject): Promise<void> {
    await this.postgresqlService.readingRecord.delete({
      where: { id: id.getValue() },
    });
  }

  /**
   * Delete all reading recordings by user book id
   * @description Delete all reading recordings by user book id
   * @param userBookId - The id of the user book to be deleted
   * @returns The number of deleted reading recordings
   */
  async deleteByUserBookId(userBookId: ObjectIdValueObject): Promise<number> {
    const result = await this.postgresqlService.readingRecord.deleteMany({
      where: { user_book_id: userBookId.getValue() },
    });
    return result.count;
  }
}
