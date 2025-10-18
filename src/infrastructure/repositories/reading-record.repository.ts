// Reading Record Repository Infrastructure Implementation

// import dependencies
import { Injectable } from "@nestjs/common";
import { Prisma, ReadingRecord as PrismaReadingRecord } from "@prisma/client";

// import interfaces
import {
  ReadingRecordQueryInterface,
  ReadingRecordRepositoryInterface,
} from "@/domain/repositories/reading-record.repository.interface";

// import entities
import { ReadingRecord } from "@/domain/entities/reading-record.entity";

// import services
import { PrismaService } from "@/modules/database/prisma.service";

@Injectable()
export class ReadingRecordRepository
  implements ReadingRecordRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a reading record
   * @param readingRecord - The reading record to create
   * @returns The created reading record
   */
  public async create(readingRecord: ReadingRecord): Promise<ReadingRecord> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...readingRecordData } = readingRecord;
    return await this.prisma.readingRecord.create({
      data: readingRecordData as PrismaReadingRecord,
    });
  }

  /**
   * Find all reading records
   * @param query - The query
   * @returns The reading records and the total number of reading records
   */
  public async findAll(
    query?: ReadingRecordQueryInterface,
  ): Promise<{ readingRecords: ReadingRecord[]; totalCount: number }> {
    // build the where clause
    const whereClause: Prisma.ReadingRecordWhereInput = {};
    // if the date is provided then just use the date
    if (query?.date) {
      whereClause.date = query.date;
    } else if (query?.startDate && query?.endDate) {
      whereClause.date = {
        gte: query.startDate,
        lte: query.endDate,
      };
    } else if (query?.startDate) {
      whereClause.date = {
        gte: query.startDate,
      };
    } else if (query?.endDate) {
      whereClause.date = {
        lte: query.endDate,
      };
    }
    // if the user book id is provided then use the user book id
    if (query?.userBookId) {
      whereClause.user_book_id = query.userBookId;
    }
    // build the order by clause
    const orderByClause: Prisma.ReadingRecordOrderByWithRelationInput = {};
    if (query?.order && query?.sort) {
      orderByClause[query.sort] = query.order;
    }

    // build the skip and take clauses
    const take: number = query?.limit ?? 10;
    const skip: number = ((query?.page ?? 1) - 1) * take;

    // get the reading records
    const prismaReadingRecords: PrismaReadingRecord[] =
      await this.prisma.readingRecord.findMany({
        where: whereClause,
        orderBy: orderByClause,
        skip,
        take,
      });

    // get the total count
    const totalCount: number = await this.prisma.readingRecord.count({
      where: whereClause,
    });

    return {
      readingRecords: prismaReadingRecords,
      totalCount,
    };
  }

  /**
   * Find a reading record by id
   * @param id - The id of the reading record
   * @returns The reading record or null if the reading record is not found
   */
  public async findById(id: string): Promise<ReadingRecord | null> {
    const prismaReadingRecord: PrismaReadingRecord | null =
      await this.prisma.readingRecord.findUnique({
        where: { id },
      });
    if (!prismaReadingRecord) {
      return null;
    }
    return prismaReadingRecord as ReadingRecord;
  }

  /**
   * Update a reading record
   * @param readingRecord - The reading record to update
   * @returns The updated reading record or null if the reading record is not found
   */
  public async update(
    readingRecord: ReadingRecord,
  ): Promise<ReadingRecord | null> {
    const { id, ...readingRecordData } = readingRecord;
    const updatedReadingRecord: PrismaReadingRecord =
      await this.prisma.readingRecord.update({
        where: { id },
        data: readingRecordData as PrismaReadingRecord,
      });
    return updatedReadingRecord as ReadingRecord;
  }

  /**
   * Delete a reading record
   * @param id - The id of the reading record
   * @returns The deleted reading record or null if the reading record is not found
   */
  public async delete(id: string): Promise<ReadingRecord | null> {
    const deletedReadingRecord: PrismaReadingRecord | null =
      await this.prisma.readingRecord.delete({ where: { id } });
    if (!deletedReadingRecord) {
      return null;
    }
    return deletedReadingRecord as ReadingRecord;
  }
}
