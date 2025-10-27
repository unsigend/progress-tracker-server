// import dependencies
import { PartialType } from "@nestjs/swagger";
import { CreateBookRequestDto } from "./create.request.dto";

/**
 * Update book request DTO
 * @description Update book request DTO which is used to validate the update book request.
 */
export class UpdateBookRequestDto extends PartialType(CreateBookRequestDto) {}
