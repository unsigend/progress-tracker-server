// // import dependencies
// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from "passport-github2";
// import { ConfigService } from "@nestjs/config";
// import { type IUserRepository } from "@/modules/user/domain/repositories/user.repository";

// /**
//  * Github strategy
//  * @description Github strategy which is used to authenticate a user using Github
//  */
// @Injectable()
// export class GithubStrategy extends PassportStrategy(Strategy, "github") {
//   /**
//    * Constructor for GithubStrategy
//    * @param configService - The config service
//    * @param userRepository - The user repository
//    */
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly userRepository: IUserRepository,
//   ) {
//     // get the callback URL
//     const callBackPostfix = "auth/github/callback";
//     // get the full domain
//     let fullDomain = configService.get<string>("app.APP_BACKEND_URL")!;
//     // add the callback postfix to the full domain
//     fullDomain += `/api/v${configService.get<string>("app.APP_API_VERSION")!}`;
//     fullDomain += `/${callBackPostfix}`;

//     super({
//       clientID: configService.get<string>("auth.GITHUB_CLIENT_ID")!,
//       clientSecret: configService.get<string>("auth.GITHUB_CLIENT_SECRET")!,
//       callbackURL: fullDomain,
//       scope: ["user:email"],
//     });
//   }

//   public async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: {
//       displayName: string;
//       emails: { value: string }[];
//       photos: { value: string }[];
//     },
//     done,
//   ) {
//     const randomPassword = crypto.randomBytes(16).toString("hex");
//     const createUserDto: UserCreateDto = {
//       username: profile.displayName,
//       email: profile.emails[0]?.value,
//       avatar_url: profile.photos[0]?.value,
//       password: randomPassword,
//     };

//     // create or link the user
//     const resultUser: UserResponseDto = await this.userService.createOrLinkUser(
//       createUserDto,
//       "github",
//     );
//     done(null, resultUser);
//   }
// }
