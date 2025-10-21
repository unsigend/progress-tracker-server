// import dependencies
import { Injectable } from "@nestjs/common";

// import repositories
import { IUserRepository } from "@domain/repositories/user.repository";

// import services
import { PostgreSQLService } from "@/infrastructure/database/postgresql/service/postgresql.service";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { UsernameValueObject } from "@domain/value-objects/user/username.vo";

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

  async save(user: UserEntity): Promise<void> {}

  findById(id: ObjectIdValueObject): Promise<UserEntity | null> {}

  findByEmail(email: EmailValueObject): Promise<UserEntity | null> {}

  findByUsername(username: UsernameValueObject): Promise<UserEntity | null> {}

  findAll(query: UserQuery): Promise<UserEntity[]> {}

  delete(id: ObjectIdValueObject): Promise<void> {}
}
