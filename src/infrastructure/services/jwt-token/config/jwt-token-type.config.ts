// import dependencies
import { IsNotEmpty, IsString } from "class-validator";

/**
 * JWT token configuration type
 * @description JWT token configuration type
 */
export class JwtTokenConfigType {
  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
}
