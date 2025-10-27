// // import dependencies
// import { type IUserRepository } from "@/modules/user/domain/repositories/user.repository";
// import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
// import { Injectable } from "@nestjs/common";
// import { ProviderValueObject } from "@/modules/user/domain/value-object/provider.vo";
// import { PasswordValueObject } from "@/modules/user/domain/value-object/password.vo";
// import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
// import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";
// import { UserEntity } from "@/modules/user/domain/entities/user.entity";
// /**
//  * Connect use case
//  * @description Connect use case which is used to connect a user to a social media account
//  */
// @Injectable()
// export class ConnectUseCase {
//   constructor(private readonly userRepository: IUserRepository) {}

//   /**
//    * Execute the connect use case
//    * @param userId - The user id
//    * @param socialMedia - The social media
//    * @returns The user
//    */
//   public async execute(
//     email: EmailValueObject,
//     username: string,
//     password: PasswordValueObject,
//     avatarUrl: UrlValueObject,
//     socialMedia: string,
//   ): Promise<UserEntity> {
//     // check if the user exists
//     const user: UserEntity | null =
//       await this.userRepository.findByEmail(email);

//     // if the user exists, connect the social media to the user
//     if (user) {
//     }
//     // if the user does not exist, create a new user
//     else {
//     }
//   }
// }
