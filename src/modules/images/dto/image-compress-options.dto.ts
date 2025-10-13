// import dependencies
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, Min, Max } from "class-validator";

export class ImageCompressOptionsDto {
  @ApiPropertyOptional({
    description: "The quality of the image (1-100)",
    default: 80,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  quality?: number = 80;

  @ApiPropertyOptional({
    description: "The width of the image in pixels",
    default: 800,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10000)
  width?: number = 800;

  @ApiPropertyOptional({
    description: "The height of the image in pixels",
    default: 800,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10000)
  height?: number = 800;

  @ApiPropertyOptional({
    description: "The format of the image",
    default: "jpeg",
  })
  @IsOptional()
  @IsEnum(["jpeg", "png", "webp"])
  format?: "jpeg" | "png" | "webp" = "jpeg";
}
