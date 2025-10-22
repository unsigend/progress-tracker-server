// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import entities
import { UserEntity } from "@domain/entities/user.entity";

// import interfaces
import type { IUserRepository } from "@domain/repositories/user.repository";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";

// import value objects
import { EmailValueObject } from "@domain/value-objects/user/email.vo";

/**
 * Find user by email use case
 * @description Find user by email use case
 */
@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Execute the find user by email use case
   * @description Execute the find user by email use case
   * @param email - The email of the user to be found
   * @returns The user entity
   */
  async execute(email: EmailValueObject): Promise<UserEntity> {
    const user: UserEntity | null =
      await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
