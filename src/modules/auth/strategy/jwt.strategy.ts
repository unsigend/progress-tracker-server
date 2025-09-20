// import dependencies
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

// import service
import { ConfigService } from "@nestjs/config";
import { UserService } from "@modules/user/user.service";

// import dto
import { UserResponseDto } from "@modules/user/dto/user-response.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<string>("auth.JWT_SECRET") || "default-secret",
      ignoreExpiration: false,
    });
  }

  /**
   * Validate a user
   * @param payload - The payload of the user
   * @returns The user
   */
  public async validate(payload: {
    sub: string;
    email: string;
  }): Promise<UserResponseDto> {
    const userID = payload?.sub;
    const user: UserResponseDto | null = (await this.userService.findByID(
      userID,
      false,
    )) as UserResponseDto | null;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
