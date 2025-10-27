// import dependencies
import { IUserBookRepository } from "@/modules/reading/domain/repositories/user-book.repository";
import { UserBookEntity } from "@/modules/reading/domain/entities/user-book.entity";
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { QueryBase } from "@/shared/domain/queries/base.query";
import { UserBookMapper } from "../mapper/user-book.mapper";
import { Prisma, UserBook as UserBookModel } from "@prisma/client";
import { PostgreSQLService } from "@/modules/database/postgresql/service/postgresql.service";
import { ServerException } from "@/shared/domain/exceptions/server.exception";
import { Injectable, Logger } from "@nestjs/common";
import { ValidationException } from "@/shared/domain/exceptions/validation.exception";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { PrismaService } from "@/modules/database/postgresql/service/prisma.service";

/**
 * User book repository
 * @description User book repository which is used to store the user book information.
 */
@Injectable()
export class UserBookRepository implements IUserBookRepository {
  // private constructor
  public constructor(
    private readonly postgresqlService: PostgreSQLService,
    private readonly prismaBuilder: PrismaService,
  ) {}

  /**
   * Save a user book
   * @param userBook - The user book to save
   * @returns void
   */
  public async save(userBook: UserBookEntity): Promise<void> {
    // map the user book entity to the user book model
    const userBookModel: UserBookModel = UserBookMapper.toModel(userBook);
    // upsert the user book model into the database
    await this.postgresqlService.userBook.upsert({
      where: { id: userBookModel.id },
      update: userBookModel,
      create: userBookModel,
    });
  }

  /**
   * Find a user book by book id and user id
   * @param bookId - The book id
   * @param userId - The user id
   * @returns The user book or null if not found
   */
  public async findByBookIdAndUserId(
    bookId: ObjectIdValueObject,
    userId: ObjectIdValueObject,
  ): Promise<UserBookEntity | null> {
    // find the user book by book id and user id
    const userBookModel: UserBookModel | null =
      await this.postgresqlService.userBook.findUnique({
        where: {
          book_id_user_id: {
            book_id: bookId.getId(),
            user_id: userId.getId(),
          },
        },
      });
    return userBookModel ? UserBookMapper.toEntity(userBookModel) : null;
  }

  /**
   * Find a user book by id
   * @param id - The id of the user book
   * @returns The user book or null if not found
   */
  public async findById(
    id: ObjectIdValueObject,
  ): Promise<UserBookEntity | null> {
    // find the user book by id
    const userBookModel: UserBookModel | null =
      await this.postgresqlService.userBook.findUnique({
        where: { id: id.getId() },
      });
    return userBookModel ? UserBookMapper.toEntity(userBookModel) : null;
  }

  /**
   * Find all user books
   * @returns The user books and the total count of the user books
   */
  public async findAll(
    query: QueryBase,
  ): Promise<{ data: UserBookEntity[]; totalCount: number }> {
    const { whereClause, orderClause } = this.prismaBuilder.buildClause<
      Prisma.UserBookWhereInput,
      Prisma.UserBookOrderByWithRelationInput
    >(query);

    // build limit and page
    const take: number = query.getLimit();
    const skip: number = (query.getPage() - 1) * take;

    let userBookModels: UserBookModel[] = [];
    try {
      userBookModels = await this.postgresqlService.userBook.findMany({
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
    // get the total count of the user books
    const totalCount: number = await this.postgresqlService.userBook.count({
      where: whereClause,
    });

    return {
      data: userBookModels.map((userBookModel) =>
        UserBookMapper.toEntity(userBookModel),
      ),
      totalCount: totalCount,
    };
  }

  /**
   * Delete a user book by id
   * @param id - The id of the user book
   * @returns True if the user book was deleted, false otherwise
   */
  public async delete(id: ObjectIdValueObject): Promise<boolean> {
    // delete the user book by id
    const result: UserBookModel | null =
      await this.postgresqlService.userBook.delete({
        where: { id: id.getId() },
      });
    return result ? true : false;
  }
}
