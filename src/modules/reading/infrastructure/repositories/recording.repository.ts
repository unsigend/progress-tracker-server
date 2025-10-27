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
}
