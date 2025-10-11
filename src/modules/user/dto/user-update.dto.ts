// import dependencies
import { PartialType } from "@nestjs/swagger";
import { UserCreateDto } from "@modules/user/dto/user-create.dto";

export class UserUpdateDto extends PartialType(UserCreateDto) {}
