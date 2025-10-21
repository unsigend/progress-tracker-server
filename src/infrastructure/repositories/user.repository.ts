// import dependencies
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

// import repositories
import { IUserRepository } from "@domain/repositories/user.repository";

// import services
import { PostgreSQLService } from "@/infrastructure/database/postgresql/service/postgresql.service";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";

// import entities
import { UserEntity } from "@domain/entities/user.entity";
import { UserQuery } from "@domain/repositories/queries/user.query";

// import models
import { User as UserModel } from "@prisma/client";

// import mappers
import { UserMapper } from "@/infrastructure/mapper/user.mapper";

/**
 * User repository
 * @description User repository
 */
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly postgresqlService: PostgreSQLService) {}

  /**
   * Save a user updates or creates a new user
   * @description Save a user
   * @param user - The user to be saved
   */
  async save(user: UserEntity): Promise<void> {
    // map to the prisma user model
    const userModel: UserModel = UserMapper.toModel(user);
    const userId: string = userModel.id;

    // if the user id is provided, update the user
    if (userId) {
      await this.postgresqlService.user.update({
        where: { id: userId },
        data: userModel,
      });
    }
    // if the user id is not provided, create a new user
    else {
      await this.postgresqlService.user.create({
        data: userModel,
      });
    }
  }

  /**
   * Find a user by id
   * @description Find a user by id
   * @param id - The id of the user to be found
   * @returns The user or null if not found
   */
  async findById(id: ObjectIdValueObject): Promise<UserEntity | null> {
    const userModel: UserModel | null =
      await this.postgresqlService.user.findUnique({
        where: { id: id.getValue() },
      });
    return userModel ? UserMapper.toEntity(userModel) : null;
  }

  /**
   * Find a user by email
   * @description Find a user by email
   * @param email - The email of the user to be found
   * @returns The user or null if not found
   */
  async findByEmail(email: EmailValueObject): Promise<UserEntity | null> {
    const userModel: UserModel | null =
      await this.postgresqlService.user.findUnique({
        where: { email: email.getValue() },
      });
    return userModel ? UserMapper.toEntity(userModel) : null;
  }

  /**
   * Find all users
   * @description Find all users
   * @param query - The query to be used to find the users
   * @returns All users and total count
   */
  async findAll(
    query: UserQuery,
  ): Promise<{ users: UserEntity[]; totalCount: number }> {
    const whereClause: Prisma.UserWhereInput = {};
    const sortClause: Prisma.UserOrderByWithRelationInput = {};

    // build the where clause
    if (query.getKey() && query.getValue()) {
      whereClause[query.getKey()!] = {
        contains: query.getValue(),
        mode: "insensitive",
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

    // get the users
    const users: UserModel[] = await this.postgresqlService.user.findMany({
      where: whereClause,
      orderBy: sortClause,
      skip: skip,
      take: limit,
    });

    // get the total count
    const totalCount: number = await this.postgresqlService.user.count({
      where: whereClause,
    });

    return {
      users: users.map((user) => UserMapper.toEntity(user)),
      totalCount: totalCount,
    };
  }

  /**
   * Delete a user
   * @description Delete a user
   * @param id - The id of the user to be deleted
   */
  async delete(id: ObjectIdValueObject): Promise<void> {
    await this.postgresqlService.user.delete({
      where: { id: id.getValue() },
    });
  }
}
