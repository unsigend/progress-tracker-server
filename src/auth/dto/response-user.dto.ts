/**
 * Response user DTO
 *
 * @remarks This DTO is used to response a user
 */
export class ResponseUserDto {
  /**
   * The id of the user
   */
  id: string;

  /**
   * The name of the user
   */
  name: string;

  /**
   * The email of the user
   */
  email: string;

  /**
   * The created at of the user
   */
  createdAt: Date;

  /**
   * The updated at of the user
   */
  updatedAt: Date;
}
