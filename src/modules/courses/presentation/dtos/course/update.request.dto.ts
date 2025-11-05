import { PartialType } from "@nestjs/swagger";
import { CourseCreateRequestDto } from "./create.request.dto";

/**
 * Update course request DTO
 * @description Update course request DTO which is used to validate the update course request.
 */
export class CourseUpdateRequestDto extends PartialType(
  CourseCreateRequestDto,
) {}
