// import dependencies
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { ConnectUserUseCase } from "@/modules/auth/application/use-case/connect.use-case";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { PasswordValueObject } from "@/modules/user/domain/value-object/password.vo";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";

/**
 * Github strategy
 * @description Github strategy which is used to authenticate a user using Github
 */
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  /**
   * Constructor for GithubStrategy
   * @param configService - The config service
   * @param connectUserUseCase - The connect user use case
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly connectUserUseCase: ConnectUserUseCase,
  ) {
    // get the callback URL
    const callBackPostfix = "auth/login/github/callback";
    // get the full domain
    let fullDomain = configService.get<string>("app.APP_BACKEND_URL")!;
    // add the callback postfix to the full domain
    fullDomain += `/api/v${configService.get<string>("app.APP_API_VERSION")!}`;
    fullDomain += `/${callBackPostfix}`;

    super({
      clientID: configService.get<string>("auth.GITHUB_CLIENT_ID")!,
      clientSecret: configService.get<string>("auth.GITHUB_CLIENT_SECRET")!,
      callbackURL: fullDomain,
      scope: ["user:email"],
    });
  }

  /**
   * Validate a user
   * @param accessToken - The access token
   * @param refreshToken - The refresh token
   * @param profile - The profile of the user
   * @param done - The done function
   */
  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      displayName: string;
      emails: { value: string }[];
      photos: { value: string }[];
    },
    done: (err: any, user: UserEntity) => void,
  ) {
    const randomPassword = crypto.randomBytes(16).toString("hex");
    const userEntity: UserEntity = await this.connectUserUseCase.execute(
      new EmailValueObject(profile.emails[0].value),
      profile.displayName,
      new PasswordValueObject(randomPassword),
      "github",
      new UrlValueObject(profile.photos[0].value),
    );

    done(null, userEntity);
  }
}
