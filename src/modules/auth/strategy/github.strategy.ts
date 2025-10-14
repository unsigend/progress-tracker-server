/* eslint-disable @typescript-eslint/no-unsafe-call */
// import dependencies
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import * as crypto from "crypto";

// import services
import { ConfigService } from "@nestjs/config";
import { UserService } from "@/modules/user/user.service";

// import dto
import { UserCreateDto } from "@modules/user/dto/user-create.dto";
import { UserResponseDto } from "@/modules/user/dto/user-response.dto";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    let fullDomain = configService.get<string>("app.DOMAIN")!;
    fullDomain += `/api/${configService.get<string>("app.API_VERSION")!}/auth/github/callback`;

    super({
      clientID: configService.get<string>("auth.GITHUB_CLIENT_ID")!,
      clientSecret: configService.get<string>("auth.GITHUB_CLIENT_SECRET")!,
      callbackURL: fullDomain,
      scope: ["user:email"],
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      displayName: string;
      emails: { value: string }[];
      photos: { value: string }[];
    },
    done,
  ) {
    const randomPassword = crypto.randomBytes(16).toString("hex");
    const createUserDto: UserCreateDto = {
      username: profile.displayName,
      email: profile.emails[0]?.value,
      avatar_url: profile.photos[0]?.value,
      password: randomPassword,
    };

    // create or link the user
    const resultUser: UserResponseDto = await this.userService.createOrLinkUser(
      createUserDto,
      "github",
    );
    done(null, resultUser);
  }
}
