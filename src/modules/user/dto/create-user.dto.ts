// import dependencies
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  IsEnum,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";

export class CreateUserDto {
  @ApiProperty({
    description: "The username of the user",
    example: "JohnDoe",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: "The email of the user",
    example: "john.doe@gmail.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The password of the user",
    example: "password",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiPropertyOptional({
    description: "The avatar url of the user",
    example: "https://example.com/avatar.png",
  })
  @IsString()
  @IsOptional()
  avatar_url?: string | null;

  @ApiPropertyOptional({
    description: "The role of the user",
    example: "USER",
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
