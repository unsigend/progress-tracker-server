// import dependencies
import { IsNotEmpty, IsString } from "class-validator";

/**
 * Auth configuration type
 * @description Auth configuration type which is used to store the auth configuration.
 */
export class AuthConfigType {
  @IsString()
  @IsNotEmpty()
  GITHUB_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  GITHUB_CLIENT_SECRET: string;
}
