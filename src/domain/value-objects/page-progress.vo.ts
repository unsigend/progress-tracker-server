// page progress value object

import { ValidationException } from "@domain/exceptions/validation.exception";

export class PageProgressValueObject {
  private readonly currentPage: number;
  private readonly totalPages: number;

  constructor(currentPage: number, totalPages: number) {
    // validate the current page
    if (currentPage < 0) {
      throw new ValidationException(
        "Current page must be greater than or equal to 0",
      );
    }

    // validate the total pages
    if (totalPages < 0) {
      throw new ValidationException(
        "Total pages must be greater than or equal to 0",
      );
    }

    // validate the current page is less than or equal to the total pages
    if (currentPage > totalPages) {
      throw new ValidationException(
        "Current page must be less than or equal to total pages",
      );
    }

    this.currentPage = currentPage;
    this.totalPages = totalPages;
  }

  /**
   * Get the page progress value as a string
   * @returns The page progress value as a string
   */
  toString(): string {
    return `${this.currentPage}/${this.totalPages}`;
  }

  /**
   * Get the current page value
   * @returns The current page value
   */
  getCurrentPage(): number {
    return this.currentPage;
  }

  /**
   * Get the total pages value
   * @returns The total pages value
   */
  getTotalPages(): number {
    return this.totalPages;
  }

  /**
   * Get the percentage of the page progress
   * @returns The percentage of the page progress
   */
  getPercentage(): number {
    return Math.round((this.currentPage / this.totalPages) * 100) || 0;
  }

  /**
   * Check if the page progress is completed
   * @returns True if the page progress is completed, false otherwise
   */
  isCompleted(): boolean {
    return this.currentPage === this.totalPages;
  }

  /**
   * Check if the page progress is equal to another page progress
   * @param pageProgress - The page progress to check
   * @returns True if the page progress is equal to the other page progress, false otherwise
   */
  equals(pageProgress: PageProgressValueObject): boolean {
    return (
      this.currentPage === pageProgress.getCurrentPage() &&
      this.totalPages === pageProgress.getTotalPages()
    );
  }
}
