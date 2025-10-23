// import dependencies
import { Injectable } from "@nestjs/common";
import { Prisma, UserBook as UserBookModel } from "@prisma/client";

// import repositories
import { IUserBookRepository } from "@domain/repositories/user-book.repository";

// import services
import { PostgreSQLService } from "@/infrastructure/database/postgresql/service/postgresql.service";

// import entities
import { UserBookEntity } from "@/domain/entities/user-book.entity";

// import value objects
import { ObjectIdValueObject } from "@/domain/value-objects/common/object-id.vo";

// import mappers
import { UserBookMapper } from "@/infrastructure/mapper/user-book.mapper";

// import queries
import { UserBookQuery } from "@domain/repositories/queries/user-book.query";

/**
 * User book repository
 * @description User book repository
 */
@Injectable()
export class UserBookRepository implements IUserBookRepository {
  constructor(private readonly postgresqlService: PostgreSQLService) {}

  /**
   * Save a user book updates or creates a new user book
   * @description Save a user book
   * @param userBook - The user book to be saved
   */
  async save(userBook: UserBookEntity): Promise<void> {
    // map to the prisma user book model
    const userBookModel: UserBookModel = UserBookMapper.toModel(userBook);

    // update or create the user book
    await this.postgresqlService.userBook.upsert({
      where: { id: userBookModel.id },
      update: userBookModel,
      create: userBookModel,
    });
  }

  /**
   * Find a user book by id
   * @description Find a user book by id
   * @param id - The id of the user book to be found
   * @returns The user book or null if not found
   */
  async findById(id: ObjectIdValueObject): Promise<UserBookEntity | null> {
    // find the user book by id
    const userBookModel: UserBookModel | null =
      await this.postgresqlService.userBook.findUnique({
        where: { id: id.getValue() },
      });

    return userBookModel ? UserBookMapper.toEntity(userBookModel) : null;
  }

  /**
   * Find all user books
   * @description Find all user books
   * @param query - The query to be used to find the user books
   * @returns The user books and total count
   */
  async findAll(
    query: UserBookQuery,
  ): Promise<{ userBooks: UserBookEntity[]; totalCount: number }> {
    const whereClause: Prisma.UserBookWhereInput = {};
    const sortClause: Prisma.UserBookOrderByWithRelationInput = {};

    // build the where clause and connected with AND
    if (query.getUserId()) {
      whereClause["user_id"] = query.getUserId()!.getValue();
    }
    if (query.getBookId()) {
      whereClause["book_id"] = query.getBookId()!.getValue();
    }
    // if the both key and value are provided use them to filter
    // but with key equals to the value (eg: readingStatue=COMPLETED)
    if (query.getKey() && query.getValue()) {
      whereClause[query.getKey()!] = {
        equals: query.getValue(),
      };
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

    // get the user books
    const userBooks: UserBookModel[] =
      await this.postgresqlService.userBook.findMany({
        where: whereClause,
        orderBy: sortClause,
        skip: skip,
        take: limit,
      });

    // get the total count
    const totalCount: number = await this.postgresqlService.userBook.count({
      where: whereClause,
    });

    return {
      userBooks: userBooks.map((userBook) => UserBookMapper.toEntity(userBook)),
      totalCount: totalCount,
    };
  }

  /**
   * Delete a user book
   * @description Delete a user book
   * @param id - The id of the user book to be deleted
   */
  async delete(id: ObjectIdValueObject): Promise<void> {
    // delete the user book
    await this.postgresqlService.userBook.delete({
      where: { id: id.getValue() },
    });
  }
}
