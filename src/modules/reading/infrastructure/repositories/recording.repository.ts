// import dependencies
import { IRecordingRepository } from "@/modules/reading/domain/repositories/recording.repository";
import { RecordingEntity } from "@/modules/reading/domain/entities/recording.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { ReadingRecord as ReadingRecordModel } from "@prisma/client";
import { RecordingMapper } from "../mapper/recording.mapper";
import { PostgreSQLService } from "@/modules/database/postgresql/service/postgresql.service";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { PrismaService } from "@/modules/database/postgresql/service/prisma.service";
import { Prisma } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ValidationException } from "@/shared/domain/exceptions/validation.exception";
import { ServerException } from "@/shared/domain/exceptions/server.exception";
import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
/**
 * Recording repository
 * @description Recording repository which is used to store the recording information.
 */
@Injectable()
export class RecordingRepository implements IRecordingRepository {
  // private constructor
  public constructor(
    private readonly postgresqlService: PostgreSQLService,
    private readonly prismaBuilder: PrismaService,
  ) {}

  /**
   * Save a recording
   * @param recording - The recording to save
   * @returns void
   */
  public async save(recording: RecordingEntity): Promise<void> {
    // map the recording entity to the recording model
    const recordingModel: ReadingRecordModel =
      RecordingMapper.toModel(recording);

    // upsert the recording model into the database
    await this.postgresqlService.readingRecord.upsert({
      where: { id: recordingModel.id },
      update: recordingModel,
      create: recordingModel,
    });
  }

  /**
   * Find recordings by user book id
   * @param userBookId - The user book id
   * @returns The recordings and the total count of the recordings
   */
  public async findByUserBookId(
    userBookId: ObjectIdValueObject,
  ): Promise<{ data: RecordingEntity[]; totalCount: number }> {
    // find the recordings by user book id
    const recordingsModels: ReadingRecordModel[] =
      await this.postgresqlService.readingRecord.findMany({
        where: { user_book_id: userBookId.getId() },
      });
    return {
      data: recordingsModels.map((recordingModel) =>
        RecordingMapper.toEntity(recordingModel),
      ),
      totalCount: recordingsModels.length,
    };
  }

  /**
   * Find a recording by id
   * @param id - The id of the recording
   * @returns The recording or null if not found
   */
  public async findById(
    id: ObjectIdValueObject,
  ): Promise<RecordingEntity | null> {
    // find the recording by id
    const recordingModel: ReadingRecordModel | null =
      await this.postgresqlService.readingRecord.findUnique({
        where: { id: id.getId() },
      });
    return recordingModel ? RecordingMapper.toEntity(recordingModel) : null;
  }

  /**
   * Find all recordings
   * @returns The recordings and the total count of the recordings
   */
  public async findAll(query: QueryBase): Promise<{
    data: RecordingEntity[];
    totalCount: number;
  }> {
    const { whereClause, orderClause } = this.prismaBuilder.buildClause<
      Prisma.ReadingRecordWhereInput,
      Prisma.ReadingRecordOrderByWithRelationInput
    >(query);

    // build limit and page
    const take: number = query.getLimit();
    const skip: number = (query.getPage() - 1) * take;

    // find all recordings
    let recordingsModels: ReadingRecordModel[] = [];
    try {
      recordingsModels = await this.postgresqlService.readingRecord.findMany({
        where: whereClause,
        orderBy: orderClause,
        take: take,
        skip: skip,
      });
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ValidationException("Invalid query key");
      }
      Logger.error(error);
      throw new ServerException("An unexpected error occurred");
    }

    // get the total count of the recordings
    const totalCount: number = await this.postgresqlService.readingRecord.count(
      {
        where: whereClause,
      },
    );
    return {
      data: recordingsModels.map((recordingModel) =>
        RecordingMapper.toEntity(recordingModel),
      ),
      totalCount: totalCount,
    };
  }

  /**
   * Find recordings by user id
   * @param userId - The user id
   * @param query - The query
   * @returns The recordings and the total count of the recordings
   */
  public async findByUserId(
    userId: ObjectIdValueObject,
    query: QueryBase,
  ): Promise<{ data: RecordingEntity[]; totalCount: number }> {
    const { whereClause, orderClause } = this.prismaBuilder.buildClause<
      Prisma.ReadingRecordWhereInput,
      Prisma.ReadingRecordOrderByWithRelationInput
    >(query);

    // composite the where clause with the user id constrain
    const compositeWhereClause: Prisma.ReadingRecordWhereInput = {
      AND: [
        whereClause,
        {
          user_book: {
            user_id: userId.getId(),
          },
        },
      ],
    };

    // build limit and page
    const take: number = query.getLimit();
    const skip: number = (query.getPage() - 1) * take;

    // find the recordings by user id
    const [totalCount, recordingsModels] = await Promise.all([
      this.postgresqlService.readingRecord.count({
        where: compositeWhereClause,
      }),
      this.postgresqlService.readingRecord.findMany({
        where: compositeWhereClause,
        orderBy: orderClause,
        take: take,
        skip: skip,
      }),
    ]);

    return {
      data: recordingsModels.map((recordingModel) =>
        RecordingMapper.toEntity(recordingModel),
      ),
      totalCount: totalCount,
    };
  }

  /**
   * Find aggregated recordings
   * @param userId - The user id
   * @param query - The query
   * @returns The aggregated recordings
   */
  public async findAggregated(
    userId: ObjectIdValueObject,
    query: QueryBase,
  ): Promise<{
    totalMinutes: number;
    totalPages: number;
    totalRecordings: number;
  }> {
    const { whereClause } = this.prismaBuilder.buildClause<
      Prisma.ReadingRecordWhereInput,
      Prisma.ReadingRecordOrderByWithRelationInput
    >(query);

    // composite the where clause with the user id constrain
    const compositeWhereClause: Prisma.ReadingRecordWhereInput = {
      AND: [
        whereClause,
        {
          user_book: {
            user_id: userId.getId(),
          },
        },
      ],
    };

    // aggregate the recordings
    const aggregatedResult =
      await this.postgresqlService.readingRecord.aggregate({
        where: compositeWhereClause,
        _sum: {
          minutes: true,
          pages: true,
        },
        _count: {
          id: true,
        },
      });

    return {
      totalMinutes: aggregatedResult._sum.minutes ?? 0,
      totalPages: aggregatedResult._sum.pages ?? 0,
      totalRecordings: aggregatedResult._count.id ?? 0,
    };
  }

  /**
   * Delete a recording by id
   * @param id - The id of the recording
   * @returns True if the recording was deleted, false otherwise
   */
  public async delete(id: ObjectIdValueObject): Promise<boolean> {
    // delete the recording by id
    const result: ReadingRecordModel | null =
      await this.postgresqlService.readingRecord.delete({
        where: { id: id.getId() },
      });
    return result ? true : false;
  }

  /**
   * Delete recordings by user book id
   * @param userBookId - The user book id
   * @returns True if the recordings were deleted, false otherwise
   */
  public async deleteByUserBookId(
    userBookId: ObjectIdValueObject,
  ): Promise<boolean> {
    // delete the recordings by user book id
    const result: { count: number } =
      await this.postgresqlService.readingRecord.deleteMany({
        where: { user_book_id: userBookId.getId() },
      });
    return result.count > 0 ? true : false;
  }
}
