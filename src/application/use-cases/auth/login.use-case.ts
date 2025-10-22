// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import entities
import { UserEntity } from "@domain/entities/user.entity";

// import value objects
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { PasswordValueObject } from "@domain/value-objects/user/password.vo";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";
import { UnauthorizedException } from "@domain/exceptions/unauthorized-exception";

// import repositories
import type { IUserRepository } from "@domain/repositories/user.repository";

// import services
import type { IPasswordHasher } from "@domain/services/password-hasher.interface";
import type { ITokenService } from "@domain/services/token.interface";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";
import { PASSWORD_HASHER_TOKEN } from "@domain/services/password-hasher.interface";
import { TOKEN_SERVICE_TOKEN } from "@domain/services/token.interface";

/**
 * Login use case
 * @description Login use case which will login a user and return an access token.
 */
@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
  ) {}

  /**
   * Execute the login use case
   * @description Execute the login use case
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns The access token
   */
  async execute(
    email: EmailValueObject,
    password: PasswordValueObject,
  ): Promise<string> {
    // get the user by email
    const user: UserEntity | null =
      await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // verify the password
    const isPasswordValid: boolean = await this.passwordHasher.verify(
      password,
      user.getPassword()!,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    // generate an access token
    const accessToken: string = await this.tokenService.generateAccessToken({
      userId: user.getId()!.getValue(),
      email: user.getEmail()!.getValue(),
      role: user.getRole()!.getValue(),
    });

    return accessToken;
  }
}
