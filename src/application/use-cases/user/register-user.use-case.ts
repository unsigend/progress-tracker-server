// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import interfaces
import type { IPasswordHasher } from "@domain/services/password-hasher.interface";
import type { IUserRepository } from "@domain/repositories/user.repository";

// import value objects
import { UsernameValueObject } from "@domain/value-objects/user/username.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { PasswordValueObject } from "@domain/value-objects/user/password.vo";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";
import { PASSWORD_HASHER_TOKEN } from "@domain/services/password-hasher.interface";

// import entities
import { UserEntity } from "@domain/entities/user.entity";

// import exceptions
import { ConflictException } from "@domain/exceptions/conflict-exception";

/**
 * Register user use case
 * @description Register user use case
 */
@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  /**
   * Execute the register user use case
   * @description Execute the register user use case
   * @param username - The username of the user
   * @param email - The email of the user
   * @param password - The password of the user
   */
  async execute(
    username: UsernameValueObject,
    email: EmailValueObject,
    password: PasswordValueObject,
  ): Promise<void> {
    // check if the user already exists
    const user: UserEntity | null =
      await this.userRepository.findByEmail(email);
    if (user) {
      throw new ConflictException("User already exists");
    }

    // hash the password
    const hashedPassword: PasswordValueObject =
      await this.passwordHasher.hash(password);

    // create a new user
    const newUser: UserEntity = UserEntity.create(
      username,
      email,
      hashedPassword,
    );

    // save the user
    await this.userRepository.save(newUser);
  }
}
