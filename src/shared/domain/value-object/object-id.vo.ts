// import dependencies
import { validate as uuidValidate, v4 as uuidv4 } from "uuid";
import { ValidationException } from "../exceptions/validation.exception";

/**
 * Object ID value object
 * @description Object ID value object which is used to store the object id.
 */

export class ObjectIdValueObject {
  // private properties
  private readonly id: string;

  /**
   * Constructor for ObjectIdValueObject
   * @param id - The id of the object
   * @throws ValidationException if the id is not a valid UUID
   */
  constructor(id?: string | null) {
    // if the id is not provided, generate a new UUID
    if (!id) {
      this.id = uuidv4();
      return;
    }

    if (!uuidValidate(id)) {
      throw new ValidationException("Invalid UUID");
    }
    this.id = id;
  }

  /**
   * Get the id
   * @returns The id
   */
  public getId(): string {
    return this.id;
  }
}
