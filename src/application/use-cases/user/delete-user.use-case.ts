// import dependencies
import { Inject, Injectable } from "@nestjs/common";

// import entities
import { UserEntity } from "@domain/entities/user.entity";

// import exceptions
import { NotFoundException } from "@domain/exceptions/not-found-exception";

// import interfaces
import type { IUserRepository } from "@domain/repositories/user.repository";
import type { ICloud } from "@/domain/services/cloud.interface";

// import tokens
import { USER_REPOSITORY_TOKEN } from "@domain/repositories/user.repository";
import { CLOUD_TOKEN } from "@/domain/services/cloud.interface";

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";

/**
 * Delete user use case
 * @description Delete user use case
 */
@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(CLOUD_TOKEN)
    private readonly cloudService: ICloud,
  ) {}

  /**
   * Execute the delete user use case
   * @description Execute the delete user use case
   * @param id - The id of the user to be deleted
   * @returns void
   */
  async execute(id: ObjectIdValueObject): Promise<void> {
    // find the user by id
    const user: UserEntity | null = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // if the user has an avatar url, delete the image from the cloud
    if (user.getAvatarUrl()) {
      await this.cloudService.delete(user.getAvatarUrl()!);
    }

    // delete the user
    user.delete();

    // delete the user in repository
    await this.userRepository.delete(id);
  }
}
