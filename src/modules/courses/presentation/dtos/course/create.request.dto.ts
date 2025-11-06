import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from "class-validator";
import { Transform } from "class-transformer";
import { CategoriesValueObject } from "@/modules/courses/domain/value-object/categories.vo";

/**
 * Create course request DTO
 * @description Create course request DTO which is used to validate the create course request.
 */
export class CourseCreateRequestDto {
  /** The name of the course */
  @IsString()
  @IsNotEmpty()
  name: string;

  /** The categories of the course */
  @IsArray()
  @MaxLength(CategoriesValueObject.MAX_CATEGORIES)
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

  /** The course image file of the course */
  @IsOptional()
  courseImage?: Express.Multer.File;
}
