// import dependencies
import { PartialType } from "@nestjs/swagger";

// import dtos
import { UserCreateRequestDto } from "@/presentation/dtos/user/user-create.request";

/**
 * User update request dto
 * @description User update request dto
 */
export class UserUpdateRequestDto extends PartialType(UserCreateRequestDto) {}
