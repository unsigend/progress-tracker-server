// // import dependencies
// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy, VerifyCallback } from "passport-google-oauth20";
// import * as crypto from "crypto";

// // import services
// import { ConfigService } from "@nestjs/config";
// import { UserCreateDto } from "@modules/user/dto/user-create.dto";
// import { UserService } from "@/modules/user/user.service";
// import { UserResponseDto } from "@/modules/user/dto/user-response.dto";

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly userService: UserService,
//   ) {
//     let fullDomain = configService.get<string>("app.DOMAIN")!;
//     fullDomain += `/api/${configService.get<string>("app.API_VERSION")!}/auth/google/callback`;

//     super({
//       clientID: configService.get<string>("auth.GOOGLE_CLIENT_ID")!,
//       clientSecret: configService.get<string>("auth.GOOGLE_CLIENT_SECRET")!,
//       callbackURL: fullDomain,
//       scope: ["email", "profile"],
//       passReqToCallback: false,
//     });
//   }

//   public async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: {
//       name: { givenName: string; familyName: string };
//       emails: { value: string }[];
//       photos: { value: string }[];
//     },
//     callback: VerifyCallback,
//   ) {
//     const { name, emails, photos } = profile;
//     const randomPassword = crypto.randomBytes(16).toString("hex");
//     const createUserDto: UserCreateDto = {
//       username: name.givenName + " " + name.familyName,
//       email: emails[0].value,
//       password: randomPassword,
//       avatar_url: photos[0].value,
//     };

//     // create or link the user
//     const resultUser: UserResponseDto = await this.userService.createOrLinkUser(
//       createUserDto,
//       "google",
//     );

//     callback(null, resultUser);
//   }
// }
