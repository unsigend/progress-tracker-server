/**
 * Authentication response DTO
 *
 * @remarks This DTO is used for login and register responses
 */
export class AuthResponseDto {
  /**
   * The JWT access token for authentication
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  access_token: string;
}
