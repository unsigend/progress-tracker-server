import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "@/modules/user/domain/repositories/user.repository";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";
import { PasswordValueObject } from "@/modules/user/domain/value-object/password.vo";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PASSWORD_HASHER_TOKEN } from "@/modules/user/domain/services/password-hash.service";
import type { IPasswordHasher } from "@/modules/user/domain/services/password-hash.service";

/**
 * Reset password use case
 * @description Reset password use case which is used to reset the password of a user.
 */
@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  /**
   * Execute the reset password use case
   * @param password - The new password
   * @param resetToken - The reset token
   * @param code - The code to verify
   * @returns The reset password response
   */
  public async execute(
    payload: {
      email: string;
      code: string;
    },
    newPassword: string,
  ): Promise<void> {
    // check whether the user exists
    const user: UserEntity | null = await this.userRepository.findByEmail(
      new EmailValueObject(payload.email),
    );
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // hash the new password
    const hashedPassword: PasswordValueObject = await this.passwordHasher.hash(
      new PasswordValueObject(newPassword),
    );

    // update the user password
    user.setPassword(hashedPassword);
    await this.userRepository.save(user);
  }
}
