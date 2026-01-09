/**
 * Daily record value object
 * @description Daily record value object which is used to store the aggregated recordings for a single day.
 */
export class DailyRecordValueObject {
  // private properties
  private readonly date: Date;
  private readonly records: Map<
    string,
    { minutes: number; notes: string | null }
  >;
  private total: number;

  /**
   * Constructor for DailyRecordValueObject
   * @param date - The date of the daily record
   */
  constructor(date: Date) {
    this.date = date;
    this.records = new Map();
    this.total = 0;
  }

  /**
   * Get the date
   * @returns The date
   */
  public getDate(): Date {
    return this.date;
  }

  /**
   * Add a record to the daily record
   * @param recordType - The record type
   * @param minutes - The minutes
   * @param notes - The notes
   */
  public addRecord(
    recordType: string,
    minutes: number,
    notes: string | null,
  ): void {
    const existingRecord = this.records.get(recordType);
    if (existingRecord) {
      // If record type already exists, merge minutes and keep the latest notes
      this.total -= existingRecord.minutes;
      this.records.set(recordType, {
        minutes: existingRecord.minutes + minutes,
        notes: notes ?? existingRecord.notes,
      });
      this.total += existingRecord.minutes + minutes;
    } else {
      // Add new record type
      this.records.set(recordType, { minutes, notes });
      this.total += minutes;
    }
  }

  /**
   * Get the total minutes
   * @returns The total minutes
   */
  public getTotalMinutes(): number {
    return this.total;
  }

  /**
   * Get all record types for this day
   * @returns Array of record types
   */
  public getRecordTypes(): string[] {
    return Array.from(this.records.keys());
  }

  /**
   * Get a record by type
   * @param recordType - The record type
   * @returns The record or null if not found
   */
  public getRecord(
    recordType: string,
  ): { minutes: number; notes: string | null } | null {
    return this.records.get(recordType) ?? null;
  }

  /**
   * Get all records
   * @returns Map of all records
   */
  public getRecords(): Map<string, { minutes: number; notes: string | null }> {
    return this.records;
  }
}
