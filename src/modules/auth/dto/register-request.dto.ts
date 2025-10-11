// import dependencies
import { TrimString } from "@common/transform/trim-string";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterRequestDto {
  @ApiProperty({ description: "The username of the user" })
  @TrimString()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(3)
  username: string;

  @ApiProperty({ description: "The email of the user" })
  @TrimString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "The password of the user" })
  @TrimString()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
