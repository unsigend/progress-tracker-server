// import dependencies
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

// import services
import { AuthService } from "@modules/auth/auth.service";

// import dto
import { LoginRequestDto } from "@/modules/auth/dto/login-request.dto";
import { UserResponseDto } from "@modules/user/dto/user-response.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private readonly authService: AuthService) {
    // specify the validation needs email and password
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  /**
   * Validate a user for local login
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns The user or throw exception if the user is not found
   */
  public async validate(
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    const userLoginDto: LoginRequestDto = { email, password };
    const user: UserResponseDto | null =
      await this.authService.validateUser(userLoginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
