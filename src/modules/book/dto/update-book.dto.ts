// import dependencies
import { PartialType } from "@nestjs/swagger";
import { CreateBookDto } from "@modules/book/dto/create-book.dto";

export class UpdateBookDto extends PartialType(CreateBookDto) {}
