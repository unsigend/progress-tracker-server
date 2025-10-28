// import dependencies
import { PartialType } from "@nestjs/swagger";
import { UserCreateRequestDto } from "./create.request.dto";

/**
 * Update user request dto
 * @description Update user request dto which is used to validate the update user request.
 */
export class UserUpdateRequestDto extends PartialType(UserCreateRequestDto) {}
