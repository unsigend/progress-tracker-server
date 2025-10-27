// import dependencies
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "@/modules/user/domain/repositories/user.repository";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";
import { PasswordValueObject } from "@/modules/user/domain/value-object/password.vo";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import {
  type IPasswordHasher,
  PASSWORD_HASHER_TOKEN,
} from "@/modules/user/domain/services/password-hash.service";
import {
  type ITokenService,
  TOKEN_SERVICE_TOKEN,
  type ITokenPayload,
} from "@/modules/auth/domain/services/token.service";

/**
 * Register use case
 * @description Register use case which is used to register a new user
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
   * @param username - The username of the user
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns The access token
   */
  public async execute(
    username: string,
    email: EmailValueObject,
    password: PasswordValueObject,
  ): Promise<string> {
    // check if the email is already in use
    const existingUser: UserEntity | null =
      await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException("Email already in use");
    }

    // hash the password
    const hashedPassword: PasswordValueObject = await this.passwordHasher.hash(
      new PasswordValueObject(password.getPassword()),
    );

    // create the user entity
    const userEntity: UserEntity = UserEntity.create(
      username,
      email,
      hashedPassword,
    );

    // save the user entity
    await this.userRepository.save(userEntity);

    // generate the access token
    const payload: ITokenPayload = {
      userId: userEntity.getId().getId(),
      email: userEntity.getEmail().getEmail(),
      role: userEntity.getRole().getRole(),
    };
    const accessToken: string =
      await this.tokenService.generateAccessToken(payload);

    // return the access token
    return accessToken;
  }
}
