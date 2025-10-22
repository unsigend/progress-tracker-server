// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

// import entities
import { UserEntity } from "@domain/entities/user.entity";

// import interfaces
import type { IUserRepository } from "@domain/repositories/user.repository";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";

/**
 * Find user by id use case
 * @description Find user by id use case
 */
@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Execute the find user by id use case
   * @description Execute the find user by id use case
   * @param id - The id of the user to be found
   * @returns The user entity
   */
  async execute(id: ObjectIdValueObject): Promise<UserEntity> {
    const user: UserEntity | null = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
