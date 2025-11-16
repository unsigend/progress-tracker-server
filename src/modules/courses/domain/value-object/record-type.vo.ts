import { ValidationException } from "@/shared/domain/exceptions/validation.exception";

/**
 * Record type value object
 * @description Record type value object which is used to store the record type.
 */
export class RecordTypeValueObject {
  // private properties
  private readonly recordType: string;
  private readonly recordTypes: string[] = [
    "LECTURE",
    "PROJECT",
    "LAB",
    "DISCUSSION",
    "QUIZ",
    "RECITATION",
    "ASSIGNMENT",
    "HOMEWORK",
    "OTHER",
  ] as const;

  /**
   * Constructor for RecordTypeValueObject
   * @param recordType - The record type of the object
   * @throws ValidationException if the record type is not a valid record type
   */
  constructor(recordType: string) {
    if (!this.recordTypes.includes(recordType.toUpperCase())) {
      throw new ValidationException("Invalid record type");
    }
    this.recordType = recordType.toUpperCase();
  }

  /**
   * Get the record type
   * @returns The record type
   */
  public getRecordType(): string {
    return this.recordType;
  }

  /**
   * Get the allowed record types
   * @returns The allowed record types
   */
  public getAllowedRecordTypes(): string[] {
    return this.recordTypes;
  }
}
