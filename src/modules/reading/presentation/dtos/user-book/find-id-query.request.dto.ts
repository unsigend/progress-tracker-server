// import dependencies
import { IsOptional } from "class-validator";
import { Transform } from "class-transformer";

/**
 * Find id query request DTO
 * @description Find id query request DTO which is used to validate the find id query request.
 */
export class FindIdQueryRequestDto {
  /** The expand to query */
  @IsOptional()
  @Transform(({ value }) => {
    return value === "true" || value === true;
  })
  expand: boolean = false;
}
