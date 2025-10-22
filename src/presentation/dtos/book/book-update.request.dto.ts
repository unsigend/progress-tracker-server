// import dependencies
import { PartialType } from "@nestjs/swagger";

// import dtos
import { BookCreateRequestDto } from "@/presentation/dtos/book/book-create.request.dto";

/**
 * Book update request dto
 * @description Book update request dto
 */
export class BookUpdateRequestDto extends PartialType(BookCreateRequestDto) {}
