// import dependencies
import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import {
  type IUserRepository,
  USER_REPOSITORY_TOKEN,
} from "../../domain/repositories/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import { NotFoundException } from "@/shared/domain/exceptions/not-found.exception";
import { Inject } from "@nestjs/common";

/**
 * Find user by id use case
 * @description Find user by id use case which is used to find a user by id.
 */
export class FindUserIdUseCase {
  /**
   * Constructor for FindUserIdUseCase
   * @param userRepository - The user repository
   */
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Execute the find user by id use case
   * @param id - The id of the user
   * @returns The user
   */
  public async execute(id: ObjectIdValueObject): Promise<UserEntity> {
    // check if the user exists
    const user: UserEntity | null = await this.userRepository.findById(id);
    if (user === null) {
      throw new NotFoundException("User not found");
    }

    // return the user
    return user;
  }
}
