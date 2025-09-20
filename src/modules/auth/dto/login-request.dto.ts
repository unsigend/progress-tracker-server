// import dependencies
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
  @ApiProperty({ description: "The email of the user" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "The password of the user" })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
