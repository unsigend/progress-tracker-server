// import dependencies
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
} from "class-validator";
import { UserRole } from "@/domain/entities/user.entity";

/**
 * Create user request dto
 * @description Create user request dto
 */
export class CreateUserRequestDto {
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

  @ApiPropertyOptional({
    description: "The provider of the user",
    example: ["local", "google", "github"],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsIn(["local", "google", "github"], { each: true })
  provider?: string[] | null;

  @ApiPropertyOptional({
    description: "The role of the user",
    example: "USER",
    type: UserRole,
    enum: UserRole,
    enumName: "UserRole",
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole | null;

  @ApiPropertyOptional({
    description: "The avatar image file (JPEG, PNG, GIF, or WebP, max 10MB)",
    type: "string",
    format: "binary",
  })
  avatar?: Express.Multer.File | null;
}
