/**
 * User response DTO
 *
 * @remarks This DTO represents a user in API responses
 */
export class ResponseUserDto {
  /**
   * The unique identifier of the user
   * @example "cm123456789abcdef"
   */
  id: string;

  /**
   * The name of the user
   * @example "John Doe"
   */
  name: string;

  /**
   * The email address of the user
   * @example "john.doe@example.com"
   */
  email: string;

  /**
   * The timestamp when the user was created
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: Date;

  /**
   * The timestamp when the user was last updated
   * @example "2024-01-15T10:30:00.000Z"
   */
  updatedAt: Date;

  /**
   * The URL of the user's avatar
   * @example "https://example.com/avatar.jpg"
   */
  avatarURL: string | null;

  /**
   * The providers of the user
   * @example ["local", "google", "github"]
   */
  provider: string[];
}
