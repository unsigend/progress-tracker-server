// import dependencies
import { PartialType } from "@nestjs/swagger";

// import DTO
import { CreateBookDto } from "@/books/dto/create-book.dto";

/**
 * Update book DTO
 *
 * @remarks This DTO is used to update a book
 */
export class UpdateBookDto extends PartialType(CreateBookDto) {}

/**
 * Patch book DTO
 *
 * @remarks This DTO is used to patch a book
 */
export class PatchBookDto extends PartialType(CreateBookDto) {}
