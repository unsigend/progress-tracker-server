// import dependencies
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from "class-validator";

/**
 * Login request dto
 * @description Login request dto
 */
export class LoginRequestDto {
  @ApiProperty({
    description: "The email of the user",
    example: "john.doe@example.com",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "The password of the user",
    example: "password123",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
