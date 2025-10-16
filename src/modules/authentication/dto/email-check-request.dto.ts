// import dependencies
import { TrimString } from "@/common/transform/trim-string";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailCheckRequestDto {
  @ApiProperty({ description: "The email of the user" })
  @TrimString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
