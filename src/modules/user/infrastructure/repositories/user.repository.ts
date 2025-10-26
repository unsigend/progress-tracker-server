// import dependencies
import { Injectable, Logger } from "@nestjs/common";
import { PostgreSQLService } from "@/modules/database/postgresql/service/postgresql.service";
import { UserMapper } from "../mapper/user.mapper";
import { PrismaService } from "@/modules/database/postgresql/service/prisma.service";
import { Prisma, User as UserModel } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { QueryBase } from "@shared/domain/queries/base.query";
import { ObjectIdValueObject } from "@shared/domain/value-object/object-id.vo";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";
import { IUserRepository } from "@/modules/user/domain/repositories/user.repository";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { ValidationException } from "@/shared/domain/exceptions/validation.exception";
import { ServerException } from "@/shared/domain/exceptions/server.exception";

/**
 * User repository implementation
 * @description User repository implementation
 * @implements IUserRepository
 */
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly postgresqlService: PostgreSQLService,
    private readonly prismaBuilder: PrismaService,
  ) {}

  /**
   * Save a user
   * @param user - The user to save
   * @returns void
   */
  public async save(user: UserEntity): Promise<void> {
    // map the user entity to the user model
    const userModel: UserModel = UserMapper.toModel(user);
    // upsert the user model into the database
    await this.postgresqlService.user.upsert({
      where: { id: userModel.id },
      update: userModel,
      create: userModel,
    });
  }

  /**
   * Find a user by id
   * @param id - The id of the user
   * @returns The user or null if not found
   */
  public async findById(id: ObjectIdValueObject): Promise<UserEntity | null> {
    // find the user model by id
    const userModel: UserModel | null =
      await this.postgresqlService.user.findUnique({
        where: { id: id.getId() },
      });

    return userModel ? UserMapper.toEntity(userModel) : null;
  }

  /**
   * Find a user by email
   * @param email - The email of the user
   * @returns The user or null if not found
   */
  public async findByEmail(
    email: EmailValueObject,
  ): Promise<UserEntity | null> {
    // find the user model by email
    const userModel: UserModel | null =
      await this.postgresqlService.user.findUnique({
        where: { email: email.getEmail() },
      });
    return userModel ? UserMapper.toEntity(userModel) : null;
  }

  /**
   * Find all users
   * @param query - The query to find the users
   * @returns The users and the total count of the users
   */
  public async findAll(
    query: QueryBase,
  ): Promise<{ data: UserEntity[]; totalCount: number }> {
    const { whereClause, orderClause } = this.prismaBuilder.buildClause<
      Prisma.UserWhereInput,
      Prisma.UserOrderByWithRelationInput
    >(query);

    // build limit and page
    const take: number = query.getLimit();
    const skip: number = (query.getPage() - 1) * take;

    // find all users
    let users: UserModel[] = [];
    try {
      users = await this.postgresqlService.user.findMany({
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

    // get the total count of the users
    const totalCount: number = await this.postgresqlService.user.count({
      where: whereClause,
    });

    return {
      data: users.map((user) => UserMapper.toEntity(user)),
      totalCount: totalCount,
    };
  }

  /**
   * Delete a user by id
   * @param id - The id of the user
   * @returns True if the user was deleted, false otherwise
   */
  public async delete(id: ObjectIdValueObject): Promise<boolean> {
    // delete the user model by id
    const result: UserModel | null = await this.postgresqlService.user.delete({
      where: { id: id.getId() },
    });
    return result ? true : false;
  }
}
