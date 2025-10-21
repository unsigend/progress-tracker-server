// import dependencies
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Register request dto
 * @description Register request dto
 */
export class RegisterRequestDto {
  @ApiProperty({
    description: "The username of the user",
    example: "john_doe",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

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
