// import dependencies
import { IsNotEmpty, IsString } from "class-validator";

/**
 * PostgreSQL configuration type
 * @description PostgreSQL configuration type
 */
export class PostgreSQLConfigType {
  @IsNotEmpty()
  @IsString()
  POSTGRESQL_URL: string;
}
