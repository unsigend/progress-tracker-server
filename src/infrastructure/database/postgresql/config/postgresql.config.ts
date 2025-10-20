// import dependencies
import { registerAs } from "@nestjs/config";
import { PostgreSQLConfigType } from "@/infrastructure/database/postgresql/config/postgresql-type.config";
import { validateConfig } from "@/platforms/utils/validate-config";

/**
 * PostgreSQL Configuration
 * @description PostgreSQL Configuration
 */
export default registerAs<PostgreSQLConfigType>("postgresql", () => {
  validateConfig(PostgreSQLConfigType, process.env);

  return {
    POSTGRESQL_URL: process.env.POSTGRESQL_URL!,
  };
});
