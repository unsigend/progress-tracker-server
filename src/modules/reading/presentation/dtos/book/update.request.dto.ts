// import dependencies
import { PartialType } from "@nestjs/swagger";
import { BookCreateRequestDto } from "./create.request.dto";

/**
 * Update book request DTO
 * @description Update book request DTO which is
 * used to validate the update book request.
 */
export class BookUpdateRequestDto extends PartialType(BookCreateRequestDto) {}
