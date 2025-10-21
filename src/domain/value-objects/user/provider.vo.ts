// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Provider value object
 * @description Provider value object
 */
export class ProviderValueObject {
  private readonly ALLOWED_PROVIDERS = ["local", "google", "github"] as const;
  private readonly provider: string[];

  /**
   * Constructor
   * @param provider - The provider to be validated
   */
  constructor(provider: string[]) {
    if (!provider) {
      throw new ValidationException("Provider is required");
    }
    // if one of the providers is not in the allowed providers, throw an error
    if (
      !provider.every((p) =>
        this.ALLOWED_PROVIDERS.includes(
          p as (typeof this.ALLOWED_PROVIDERS)[number],
        ),
      )
    ) {
      throw new ValidationException("Invalid provider");
    }
    this.provider = provider;
  }

  /**
   * Get the value of the provider
   * @returns The value of the provider
   */
  public getValue(): string[] {
    return this.provider;
  }

  /**
   * Check if the provider contains a specific provider
   * @param provider - The provider to check
   * @returns True if the provider contains the specific provider, false otherwise
   */
  public contains(provider: string): boolean {
    return this.provider.includes(provider);
  }
}
