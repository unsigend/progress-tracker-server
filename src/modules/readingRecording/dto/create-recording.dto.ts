// import dependencies
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsUUID,
  IsDate,
  IsInt,
  Min,
  IsString,
  IsOptional,
  MaxLength,
} from "class-validator";

export class CreateRecordingDto {
  @ApiProperty({ description: "The user book id", type: String })
  @IsUUID()
  user_book_id: string;

  @ApiProperty({ description: "The date of the recording", type: Date })
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty({ description: "The pages", type: Number })
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: "Pages must be greater than 0" })
  pages: number;

  @ApiProperty({ description: "The minutes", type: Number })
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: "Minutes must be greater than 0" })
  minutes: number;

  @ApiProperty({ description: "The notes", type: String })
  @IsString()
  @IsOptional()
  @MaxLength(512, { message: "Notes must be less than 512 characters" })
  notes?: string | null;
}
