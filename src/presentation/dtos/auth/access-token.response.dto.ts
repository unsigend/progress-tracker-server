// import dependencies
import { ApiProperty } from "@nestjs/swagger";

/**
 * Access token response dto
 * @description Access token response dto
 */
export class AccessTokenResponseDto {
  @ApiProperty({
    description: "The access token for authentication",
    type: String,
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e..jw..",
  })
  accessToken: string;
}
