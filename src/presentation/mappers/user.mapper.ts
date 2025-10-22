// import dependencies
import { Injectable } from "@nestjs/common";

// import entities
import { UserEntity } from "@domain/entities/user.entity";

// import dtos
import { UserResponseDto } from "@/presentation/dtos/user/user.response.dto";

/**
 * User mapper
 * @description User mapper
 */
@Injectable()
export class UserMapper {
  /**
   * Map a user entity to a user response dto
   * @param user - The user entity to be mapped
   * @returns The user response dto
   */
  public static toResponseDto(user: UserEntity): UserResponseDto {
    return {
      id: user.getId()!.getValue(),
      username: user.getUsername()!.getValue(),
      email: user.getEmail()!.getValue(),
      avatarUrl: user.getAvatarUrl()?.getValue() ?? "",
      provider: user.getProvider()!.getValue(),
      role: user.getRole()!.getValue(),
      createdAt: user.getCreatedAt()!,
      updatedAt: user.getUpdatedAt()!,
      deletedAt: user.getDeletedAt(),
    };
  }
}
