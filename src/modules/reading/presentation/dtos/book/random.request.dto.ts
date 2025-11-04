// import dependencies
import { IsNotEmpty, IsNumber } from "class-validator";

/**
 * Random book request DTO
 * @description Random book request DTO which is used to validate the random book request.
 */
export class RandomBookRequestDto {
  /** The count of the books to find */
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
