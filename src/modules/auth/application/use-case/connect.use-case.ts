// import dependencies
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "@/modules/user/domain/repositories/user.repository";
import { Inject, Injectable } from "@nestjs/common";
import { ProviderValueObject } from "@/modules/user/domain/value-object/provider.vo";
import { PasswordValueObject } from "@/modules/user/domain/value-object/password.vo";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";
import {
  UserEntity,
  UserRole,
} from "@/modules/user/domain/entities/user.entity";
import { RoleValueObject } from "@/modules/user/domain/value-object/role.vo";
/**
 * Connect use case
 * @description Connect use case which is used to connect a user to a social media account
 */
@Injectable()
export class ConnectUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Execute the connect use case
   * @param userId - The user id
   * @param socialMedia - The social media
   * @returns The user
   */
  public async execute(
    email: EmailValueObject,
    username: string,
    password: PasswordValueObject,
    provider: string,
    avatarUrl?: UrlValueObject,
  ): Promise<UserEntity> {
    // check if the user exists
    const user: UserEntity | null =
      await this.userRepository.findByEmail(email);

    // if the user exists, connect the social media to the user
    if (user) {
      user.getProvider().addProvider(provider);
      if (avatarUrl && user.getAvatarUrl() === null) {
        user.setAvatarUrl(avatarUrl);
      }
      await this.userRepository.save(user);
      return user;
    }
    // if the user does not exist, create a new user
    else {
      const userEntity: UserEntity = UserEntity.create(
        username,
        email,
        password,
        new RoleValueObject(UserRole.USER),
        avatarUrl,
        new ProviderValueObject([provider]),
      );
      await this.userRepository.save(userEntity);
      return userEntity;
    }
  }
}
