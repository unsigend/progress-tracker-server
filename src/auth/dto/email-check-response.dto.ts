/**
 * Email check response DTO
 *
 * @remarks This DTO is used for email availability check responses
 */
export class EmailCheckResponseDto {
  /**
   * Whether the email already exists in the system
   * @example true
   */
  exists: boolean;
}
