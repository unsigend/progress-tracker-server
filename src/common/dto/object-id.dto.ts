// import dependencies
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

/**
 * This dto is used to store the object id.
 */
export class ObjectIdDto {
  @ApiProperty({ description: "The object id", type: String })
  @IsUUID()
  id: string;
}
