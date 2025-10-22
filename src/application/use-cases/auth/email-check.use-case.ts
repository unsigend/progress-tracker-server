// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import entities
import { UserEntity } from "@domain/entities/user.entity";

// import repositories
import type { IUserRepository } from "@domain/repositories/user.repository";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";

// import value objects
import { EmailValueObject } from "@domain/value-objects/user/email.vo";

/**
 * Email check use case
 * @description Email check use case
 */
@Injectable()
export class EmailCheckUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Execute the email check use case
   * @description Execute the email check use case
   * @param email - The email to check
   * @returns True if the email is exists, false otherwise
   */
  async execute(email: EmailValueObject): Promise<boolean> {
    const user: UserEntity | null =
      await this.userRepository.findByEmail(email);
    return user !== null;
  }
}
