// import dependencies
import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "@modules/user/dto/create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
