import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

/**
 * Create course request DTO
 * @description Create course request DTO which is used to validate the create course request.
 */
export class CourseCreateRequestDto {
  /** The name of the course */
  @IsString()
  @IsNotEmpty()
  name: string;

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
