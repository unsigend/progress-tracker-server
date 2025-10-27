// import dependencies
import { ValidationException } from "@shared/domain/exceptions/validation.exception";

/**
 * Provider value object
 * @description Provider value object which is used to store the provider.
 */
export class ProviderValueObject {
  // private properties
  private provider: string[];
  private readonly ALLOWED_PROVIDERS: string[] = ["local", "google", "github"];

  /**
   * Constructor for ProviderValueObject
   * @param provider - The provider of the object
   * @throws ValidationException if the provider is not a valid provider
   */
  constructor(provider: string[]) {
    if (
      !provider?.length ||
      !provider.every((p) => this.ALLOWED_PROVIDERS.includes(p))
    ) {
      throw new ValidationException("Invalid provider");
    }
    this.provider = provider;
  }

  /**
   * Get the provider
   * @returns The provider
   */
  public getProvider(): string[] {
    return this.provider;
  }

  /**
   * Add a provider
   * @param provider - The provider to add
   */
  public addProvider(provider: string): void {
    // check if the provider is valid
    if (!this.ALLOWED_PROVIDERS.includes(provider)) {
      throw new ValidationException("Invalid provider");
    }
    // check if the provider is already in the list
    // only add if it is not already in the list
    if (!this.provider.includes(provider)) {
      this.provider.push(provider);
    }
  }

  /**
   * Remove a provider
   * @param provider - The provider to remove
   */
  public removeProvider(provider: string): void {
    // check if the provider is valid
    if (!this.ALLOWED_PROVIDERS.includes(provider)) {
      throw new ValidationException("Invalid provider");
    }
    this.provider = this.provider.filter((p) => p !== provider);
  }

  /**
   * Get the allowed providers
   * @returns The allowed providers
   */
  public getAllowedProviders(): string[] {
    return this.ALLOWED_PROVIDERS;
  }
}
