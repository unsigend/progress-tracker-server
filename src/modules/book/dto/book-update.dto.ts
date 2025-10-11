// import dependencies
import { PartialType } from "@nestjs/swagger";
import { BookCreateDto } from "@modules/book/dto/book-create.dto";

export class BookUpdateDto extends PartialType(BookCreateDto) {}
