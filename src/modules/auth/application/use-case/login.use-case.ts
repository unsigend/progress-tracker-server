// import dependencies
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  type ITokenService,
  TOKEN_SERVICE_TOKEN,
  type ITokenPayload,
} from "@/modules/auth/domain/services/token.service";
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "@/modules/user/domain/repositories/user.repository";
import {
  type IPasswordHasher,
  PASSWORD_HASHER_TOKEN,
} from "@/modules/user/domain/services/password-hash.service";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";
import { PasswordValueObject } from "@/modules/user/domain/value-object/password.vo";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";

/**
 * Login use case
 * @description Login use case which is used to login a user
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
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns The access token
   */
  public async execute(
    email: EmailValueObject,
    password: PasswordValueObject,
  ): Promise<string> {
    // check if the user exists
    const user: UserEntity | null =
      await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException("Invalid email or password");
    }

    // verify the password
    const isPasswordValid: boolean = await this.passwordHasher.verify(
      password,
      user.getPassword(),
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // generate the access token
    const payload: ITokenPayload = {
      userId: user.getId().getId(),
      email: user.getEmail().getEmail(),
      role: user.getRole().getRole(),
    };
    const accessToken: string =
      await this.tokenService.generateAccessToken(payload);

    // return the access token
    return accessToken;
  }
}
