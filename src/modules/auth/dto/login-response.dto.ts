// import dependencies
import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
  @ApiProperty({ description: "The access token" })
  access_token: string;
}
