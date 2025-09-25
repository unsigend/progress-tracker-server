// import dependencies
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

/**
 * Validate the configuration
 * @param envVariables - The environment variables
 * @param config - The configuration
 */
function validateConfig<T extends object>(
  envVariables: new () => T,
  config: Record<string, unknown>,
): T {
  const validatedConfig = plainToInstance(envVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

export default validateConfig;
