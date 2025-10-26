// import dependencies
import { UserRole } from "../../domain/entities/user.entity";

/**
 * User response dto
 * @description User response dto
 */
export class UserResponseDto {
  /** The id of the user */
  id: string;

  /** The username of the user */
  username: string;

  /** The email of the user */
  email: string;

  /** The avatar url of the user */
  avatarUrl: string | null;

  /** The provider of the user */
  provider: string[];

  /** The role of the user */
  role: UserRole;

  /** The created at timestamp */
  createdAt: Date;

  /** The updated at timestamp */
  updatedAt: Date;
}
