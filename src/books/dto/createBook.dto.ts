import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  pages?: number;

  @IsString()
  @IsOptional()
  imageURL?: string;

  @IsString()
  @IsOptional()
  ISBN?: string;
}
