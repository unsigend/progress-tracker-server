// import dependencies
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { ValidationException } from "@domain/exceptions/validation-exception";

/**
 * Object id value object
 * @description Object id value object
 */
export class ObjectIdValueObject {
  private readonly value: string;

  /**
   * Constructor
   * @param value - The value of the object id
   */
  constructor(value?: string) {
    if (value) {
      if (!uuidValidate(value.trim())) {
        throw new ValidationException("Invalid Object ID");
      }
      this.value = value.trim();
    } else {
      // generate a new UUID
      this.value = uuidv4();
    }
  }

  /**
   * Get the value of the object id
   * @returns The value of the object id
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Check if the object id is equal to another object id
   * @param other - The other object id to compare
   * @returns True if the object id is equal to another object id, false otherwise
   */
  public equals(other: ObjectIdValueObject): boolean {
    return this.value === other.getValue();
  }
}
