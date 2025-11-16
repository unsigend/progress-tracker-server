import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import { Transform } from "class-transformer";

/**
 * Create course request DTO
 * @description Create course request DTO which is used to validate the create course request.
 */
export class CourseCreateRequestDto {
  /** The name of the course */
  @IsString()
  @IsNotEmpty()
  name: string;

  /** The categories of the course maximum 3 categories*/
  @IsArray()
  @IsOptional()
  categories?: string[];

  /** The is public of the course */
  @Transform(({ value }) => value === "true" || value === true)
  @IsOptional()
  isPublic?: boolean;

  /** The description of the course */
  @IsString()
  @IsOptional()
  description?: string;

  /** The source of the course */
  @IsString()
  @IsOptional()
  source?: string;

  /** The official website url of the course */
  @IsUrl()
  @IsOptional()
  officialWebsiteUrl?: string;
}
