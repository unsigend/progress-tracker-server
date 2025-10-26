// // import dependencies
// import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

// /**
//  * JWT strategy
//  * @description JWT strategy will extract the access token from the request header
//  * and validate the token then attach the user to the request object
//  * @note This strategy is used for protected routes
//  */
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
//   constructor(
//     @Inject(USER_REPOSITORY_TOKEN)
//     private readonly userRepository: IUserRepository,
//     private readonly configService: ConfigService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: configService.get<string>(
//         "jwtToken.JWT_ACCESS_TOKEN_SECRET",
//       )!,
//       ignoreExpiration: false,
//     });
//   }

//   /**
//    * Validate a user
//    * @param payload - The payload of the user
//    * @returns The user that will be attached to the request object
//    */
//   public async validate(payload: ITokenPayload): Promise<UserEntity> {
//     const user: UserEntity | null = await this.userRepository.findById(
//       new ObjectIdValueObject(payload.userId),
//     );
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
