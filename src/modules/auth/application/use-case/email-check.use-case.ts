// import dependencies
import { Inject, Injectable } from "@nestjs/common";
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "@/modules/user/domain/repositories/user.repository";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";

/**
 * Email check use case
 * @description Email check use case which is used to
 * check if an email is already in use.
 */
@Injectable()
export class EmailCheckUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Execute the email check use case
   * @param email - The email to check
   * @returns True if the email is already in use, false otherwise
   */
  public async execute(email: EmailValueObject): Promise<boolean> {
    const user: UserEntity | null =
      await this.userRepository.findByEmail(email);
    return user !== null;
  }
}
