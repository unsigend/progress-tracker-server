// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import exceptions
import { ConflictException } from "@domain/exceptions/conflict-exception";

// import interfaces
import type { IPasswordHasher } from "@domain/services/password-hasher.interface";
import type { IUserRepository } from "@domain/repositories/user.repository";
import type { ITokenService } from "@domain/services/token.interface";

// import value objects
import { UsernameValueObject } from "@domain/value-objects/user/username.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { PasswordValueObject } from "@domain/value-objects/user/password.vo";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";
import { PASSWORD_HASHER_TOKEN } from "@domain/services/password-hasher.interface";
import { TOKEN_SERVICE_TOKEN } from "@/domain/services/token.interface";

// import entities
import { UserEntity } from "@domain/entities/user.entity";

/**
 * Register use case
 * @description Register use case
 */
@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
  ) {}

  /**
   * Execute the register use case
   * @description Execute the register use case
   * @param username - The username of the user
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns The access token
   */
  async execute(
    username: UsernameValueObject,
    email: EmailValueObject,
    password: PasswordValueObject,
  ): Promise<string> {
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

    // generate an access token
    const accessToken: string = await this.tokenService.generateAccessToken({
      userId: newUser.getId()!.getValue(),
      email: newUser.getEmail()!.getValue(),
      role: newUser.getRole()!.getValue(),
    });

    return accessToken;
  }
}
