// import dependencies
import { IsNotEmpty, IsString } from "class-validator";

/**
 * PostgreSQL Configuration Type
 * @description PostgreSQL Configuration Type
 */
export class PostgreSQLConfigType {
  @IsString()
  @IsNotEmpty()
  POSTGRESQL_URL: string;
}
