// import dependencies
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  Min,
  Max,
} from "class-validator";

/**
 * App Configuration Type
 * @description App Configuration Type
 */
export class AppConfigType {
  @IsOptional()
  @IsString()
  ENVIRONMENT?: "development" | "production" = "development";

  @IsString()
  @IsNotEmpty()
  DOMAIN: string;

  @ValidateIf((object: AppConfigType) => object.ENVIRONMENT === "development")
  @IsNumber()
  @Min(3000)
  @Max(65535)
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsOptional()
  API_PREFIX?: string = "api";

  @IsString()
  @IsOptional()
  API_VERSION?: string = "v1";
}
