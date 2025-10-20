// object id value object

// import dependencies
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Object id value object
 * @description This value object is used to validate and store the object id
 */
export class ObjectIdValueObject {
  private readonly objectId: string;

  /**
   * Create a new object id value object
   * @param objectId - The object id to create the value object for
   * @throws {ValidationException} - If the object id is invalid
   */
  constructor(objectId: string) {
    // check if the object id is required
    if (!objectId || objectId.trim() === "") {
      throw new ValidationException("Object id is required");
    }

    this.objectId = objectId.trim();
  }

  /**
   * Get the value of the object id
   * @returns The object id
   */
  getValue(): string {
    return this.objectId;
  }

  /**
   * Get the string representation of the object id
   * @returns The object id
   */
  toString(): string {
    return this.objectId;
  }

  /**
   * Check if the object id is equal to another object id
   * @param other - The other object id
   * @returns True if the object id is equal to the other object id, false otherwise
   */
  equals(other: ObjectIdValueObject): boolean {
    if (!other) {
      return false;
    }
    return this.objectId === other.objectId;
  }
}
