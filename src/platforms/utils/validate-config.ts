// import dependencies
import { plainToInstance } from "class-transformer";
import { validateSync, ValidationError } from "class-validator";

/**
 * Validate the environment variables
 * @param envConfigClass - The environment variables type template
 * @param envSource - The environment variables source
 * @returns The validated environment variables
 */
export function validateConfig<T extends object>(
  envConfigClass: new () => T,
  envSource: Record<string, unknown>,
): T {
  const validatedConfig = plainToInstance(envConfigClass, envSource, {
    enableImplicitConversion: true,
  });

  const errors: ValidationError[] = validateSync(validatedConfig as object, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
