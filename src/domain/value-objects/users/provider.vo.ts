// provider value object

// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Provider value object
 * @description This value object is used to validate and store the provider
 */
export class ProviderValueObject {
  // constant for all possible providers
  private readonly possibleProviders: string[] = [
    "local",
    "google",
    "github",
  ] as const;
  private readonly provider: string[];

  /**
   * Create a new provider value object
   * @param provider - The provider to create the value object for
   * @throws {ValidationException} - If the provider is invalid
   */
  constructor(provider: string[]) {
    if (provider.length === 0) {
      throw new ValidationException("Provider is required");
    }

    if (!provider.every((p) => this.possibleProviders.includes(p))) {
      throw new ValidationException("Invalid provider: " + provider.join(", "));
    }

    this.provider = provider;
  }

  /**
   * Get the value of the provider
   * @returns The provider
   */
  getValue(): string[] {
    return this.provider;
  }

  /**
   * Get the string representation of the provider
   * @returns The provider
   */
  toString(): string {
    return this.provider.join(", ");
  }

  /**
   * Check if the provider is equal to another provider
   * @param other - The other provider
   * @returns True if the provider is equal to the other provider, false otherwise
   */
  equals(other: ProviderValueObject): boolean {
    if (!other) {
      return false;
    }
    return this.provider.every((p) => other.provider.includes(p));
  }

  /**
   * Check if the provider contains a specific provider
   * @param provider - The provider to check for
   * @returns True if the provider contains the specific provider, false otherwise
   */
  contains(provider: string): boolean {
    return this.provider.includes(provider);
  }
}
