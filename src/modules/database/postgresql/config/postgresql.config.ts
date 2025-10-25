// import dependencies
import { registerAs } from "@nestjs/config";
import { validateConfig } from "@/platforms/util/validate-config";

// import types
import { PostgreSQLConfigType } from "./postgresql.config.type";

/**
 * PostgreSQL configuration
 * @description PostgreSQL configuration
 */
export default registerAs<PostgreSQLConfigType>(
  "postgresql",
  (): PostgreSQLConfigType => {
    validateConfig(PostgreSQLConfigType, process.env);

    return {
      POSTGRESQL_URL: process.env.POSTGRESQL_URL!,
    };
  },
);
