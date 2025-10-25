// import dependencies
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from "class-validator";
import { Type } from "class-transformer";

/**
 * Application environment
 * @description Application environment
 */
export enum AppEnvironment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

/**
 * Application configuration type
 * @description Application configuration type
 */
export class AppConfigType {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  APP_PORT: number = 3000;

  @IsOptional()
  @IsString()
  APP_NAME: string = "Progress Tracker";

  @IsOptional()
  @IsEnum(AppEnvironment)
  APP_ENVIRONMENT: AppEnvironment = AppEnvironment.DEVELOPMENT;

  @IsOptional()
  @IsString()
  APP_API_VERSION: string = "1";

  @IsNotEmpty()
  @IsString()
  APP_BACKEND_URL: string;

  @IsNotEmpty()
  @IsString()
  APP_FRONTEND_URL: string;
}
