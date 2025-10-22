// import dependencies
import { PartialType } from "@nestjs/mapped-types";

// import dtos
import { CreateUserRequestDto } from "@/presentation/dtos/user/create-user.request.dto";

/**
 * Update user request dto
 * @description Update user request dto
 */
export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {}
