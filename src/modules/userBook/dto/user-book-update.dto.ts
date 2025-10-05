// import dependencies
import { UserBookResponseDto } from "@/modules/userBook/dto/user-book-response.dto";
import { PartialType } from "@nestjs/swagger";

export class UserBookUpdateDto extends PartialType(UserBookResponseDto) {}
