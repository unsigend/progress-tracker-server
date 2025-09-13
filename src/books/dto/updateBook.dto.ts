// import dependencies
import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

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
