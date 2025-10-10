// import dependencies
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  IsEnum,
  IsArray,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { TrimString } from "@/common/transform/trim-string";

export class CreateUserDto {
  @ApiProperty({
    description: "The username of the user",
    example: "JohnDoe",
  })
  @TrimString()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: "The email of the user",
    example: "john.doe@gmail.com",
  })
  @TrimString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The password of the user",
    example: "password",
  })
  @TrimString()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiPropertyOptional({
    description: "The avatar url of the user",
    example: "https://example.com/avatar.png",
    type: String,
  })
  @TrimString()
  @IsString()
  @IsOptional()
  avatar_url?: string | null;

  @TrimString()
  @ApiPropertyOptional({
    description: "The role of the user",
    example: "USER",
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @TrimString()
  @IsArray()
  @IsOptional()
  provider?: string[];
}
