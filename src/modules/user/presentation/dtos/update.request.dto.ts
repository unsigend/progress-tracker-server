// import dependencies
import { PartialType } from "@nestjs/swagger";
import { CreateUserRequestDto } from "./create.request.dto";

/**
 * Update user request dto
 * @description Update user request dto which is used to validate the update user request.
 */
export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {}
