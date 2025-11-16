import { ValidationException } from "@/shared/domain/exceptions/validation.exception";

/**
 * Categories value object
 * @description Categories value object which is used to store the categories of the course.
 */
export class CategoriesValueObject {
  // private properties
  private categories: string[];
  // the max number of categories is 3
  public static readonly MAX_CATEGORIES = 3;

  /**
   * Constructor for CategoriesValueObject
   * @param categories - The categories to set
   */
  constructor(categories: string[]) {
    if (categories.length > CategoriesValueObject.MAX_CATEGORIES) {
      throw new ValidationException("Categories must be less than 3");
    }
    // Normalize categories to lowercase for case-insensitive matching
    this.categories = categories.map((category) => category.toLowerCase());
  }

  /**
   * Get the categories
   * @returns The categories
   */
  public getCategories(): string[] {
    return this.categories;
  }

  /**
   * Add a category to the list
   * @param category - The category to add
   */
  public addCategory(category: string): void {
    if (this.categories.length >= CategoriesValueObject.MAX_CATEGORIES) {
      throw new ValidationException("Categories must be less than 3");
    }
    // Normalize to lowercase for case-insensitive matching
    this.categories.push(category.toLowerCase());
  }

  /**
   * Remove a category from the list
   * @param category - The category to remove
   */
  public removeCategory(category: string): void {
    // Normalize to lowercase for consistent comparison
    const normalizedCategory = category.toLowerCase();
    this.categories = this.categories.filter((c) => c !== normalizedCategory);
  }

  /**
   * Set the categories
   * @param categories - The categories to set
   */
  public setCategories(categories: string[]): void {
    // Normalize categories to lowercase for case-insensitive matching
    this.categories = categories.map((category) => category.toLowerCase());
  }
}
