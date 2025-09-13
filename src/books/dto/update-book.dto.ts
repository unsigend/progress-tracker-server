// import dependencies
import { PartialType } from "@nestjs/swagger";

// import DTO
import { CreateBookDto } from "@/books/dto/create-book.dto";

export class UpdateBookDto extends PartialType(CreateBookDto) {}
