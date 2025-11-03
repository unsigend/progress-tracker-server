import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import * as crypto from "crypto";
import { ConfigService } from "@nestjs/config";
import { ConnectUserUseCase } from "@/modules/auth/application/use-case/connect.use-case";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { PasswordValueObject } from "@/modules/user/domain/value-object/password.vo";

/**
 * Google strategy
 * @description Google strategy which is used to authenticate a user using Google
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  /**
   * Constructor for GoogleStrategy
   * @param configService - The config service
   * @param connectUserUseCase - The connect user use case
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly connectUserUseCase: ConnectUserUseCase,
  ) {
    let fullDomain = configService.get<string>("app.APP_BACKEND_URL")!;
    fullDomain += `/api/v${configService.get<string>("app.APP_API_VERSION")!}`;
    fullDomain += "/auth/login/google/callback";

    super({
      clientID: configService.get<string>("auth.GOOGLE_CLIENT_ID")!,
      clientSecret: configService.get<string>("auth.GOOGLE_CLIENT_SECRET")!,
      callbackURL: fullDomain,
      scope: ["email", "profile"],
      passReqToCallback: false,
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
      name: { givenName: string; familyName: string };
      emails: { value: string }[];
      photos: { value: string }[];
    },
    callback: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;
    const randomPassword = crypto.randomBytes(16).toString("hex");

    const userEntity: UserEntity = await this.connectUserUseCase.execute(
      new EmailValueObject(emails[0].value),
      name.givenName + " " + name.familyName,
      new PasswordValueObject(randomPassword),
      "google",
      new UrlValueObject(photos[0].value),
    );

    callback(null, userEntity);
  }
}
