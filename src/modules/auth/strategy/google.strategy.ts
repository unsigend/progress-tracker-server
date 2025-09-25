// import dependencies
import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

// import services
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private readonly configService: ConfigService) {
    let fullDomain = configService.get<string>("app.DOMAIN")!;
    if (configService.get<number>("app.PORT")!) {
      fullDomain += `:${configService.get<number>("app.PORT")!}`;
    }
    fullDomain += `/api/${configService.get<string>("app.API_VERSION")!}/auth/google/callback`;

    super({
      clientID: configService.get<string>("auth.GOOGLE_CLIENT_ID")!,
      clientSecret: configService.get<string>("auth.GOOGLE_CLIENT_SECRET")!,
      callbackURL: fullDomain,
      scope: ["email", "profile"],
      passReqToCallback: false,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      name: string;
      emails: { value: string }[];
      photos: { value: string }[];
    },
    callback: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;

    Logger.log(name, emails, photos);

    callback(null, {});
  }
}
