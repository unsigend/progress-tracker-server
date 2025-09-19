// import dependencies
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";

export class UserResponseDto {
  @ApiProperty({ description: "The unique identifier of the user" })
  id: string;

  @ApiProperty({ description: "The username of the user" })
  username: string;

  @ApiProperty({ description: "The email of the user" })
  email: string;

  @ApiProperty({ description: "The avatar url of the user" })
  avatar_url: string;

  @ApiProperty({ description: "The role of the user" })
  role: UserRole;

  @ApiProperty({ description: "The created at date of the user" })
  createdAt: Date;

  @ApiProperty({ description: "The updated at date of the user" })
  updatedAt: Date;
}
