import { ObjectIdValueObject } from "@/shared/domain/value-object/object-id.vo";
import { UrlValueObject } from "@/shared/domain/value-object/url.vo";

/**
 * Course entity
 * @description Course entity which is used to store the course information.
 */
export class CourseEntity {
  // required properties
  private readonly id: ObjectIdValueObject;
  private name: string;
  private readonly createdById: ObjectIdValueObject;
  private readonly createdAt: Date;

  private description: string | null;
  private source: string | null;
  private officialWebsiteUrl: UrlValueObject | null;
  private courseImageUrl: UrlValueObject | null;
  private updatedAt: Date;

  // private constructor
  private constructor(
    name: string,
    createdById: ObjectIdValueObject,
    id?: ObjectIdValueObject | null,
    description?: string | null,
    source?: string | null,
    officialWebsiteUrl?: UrlValueObject | null,
    courseImageUrl?: UrlValueObject | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
  ) {
    this.id = id ?? new ObjectIdValueObject();
    this.name = name;
    this.createdById = createdById;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.description = description ?? null;
    this.source = source ?? null;
    this.officialWebsiteUrl = officialWebsiteUrl ?? null;
    this.courseImageUrl = courseImageUrl ?? null;
  }

  /**
   * Create a new course
   * @param name - The name of the course
   * @param createdById - The id of the user who created the course
   * @param description - The description of the course
   * @param source - The source of the course
   * @param officialWebsiteUrl - The official website url of the course
   * @param courseImageUrl - The course image url of the course
   * @returns The new course
   */
  public static create(
    name: string,
    createdById: ObjectIdValueObject,
    description?: string | null,
    source?: string | null,
    officialWebsiteUrl?: UrlValueObject | null,
    courseImageUrl?: UrlValueObject | null,
  ): CourseEntity {
    return new CourseEntity(
      name,
      createdById,
      null,
      description,
      source,
      officialWebsiteUrl,
      courseImageUrl,
    );
  }

  /**
   * Reconstitute a course
   * @param id - The id of the course
   * @param name - The name of the course
   * @param createdById - The id of the user who created the course
   * @param description - The description of the course
   * @param source - The source of the course
   * @param officialWebsiteUrl - The official website url of the course
   * @param courseImageUrl - The course image url of the course
   * @param createdAt - The created at date of the course
   * @param updatedAt - The updated at date of the course
   * @returns The course
   */
  public static reconstitute(
    id: ObjectIdValueObject,
    name: string,
    createdById: ObjectIdValueObject,
    description: string | null,
    source: string | null,
    officialWebsiteUrl: UrlValueObject | null,
    courseImageUrl: UrlValueObject | null,
    createdAt: Date,
    updatedAt: Date,
  ): CourseEntity {
    return new CourseEntity(
      name,
      createdById,
      id,
      description,
      source,
      officialWebsiteUrl,
      courseImageUrl,
      createdAt,
      updatedAt,
    );
  }

  /**
   * Get the id of the course
   * @returns The id of the course
   */
  public getId(): ObjectIdValueObject {
    return this.id;
  }

  /**
   * Get the name of the course
   * @returns The name of the course
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Get the created by id of the course
   * @returns The created by id of the course
   */
  public getCreatedById(): ObjectIdValueObject {
    return this.createdById;
  }

  /**
   * Get the created at date of the course
   * @returns The created at date of the course
   */
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Get the updated at date of the course
   * @returns The updated at date of the course
   */
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  /**
   * Get the description of the course
   * @returns The description of the course
   */
  public getDescription(): string | null {
    return this.description;
  }

  /**
   * Get the source of the course
   * @returns The source of the course
   */
  public getSource(): string | null {
    return this.source;
  }

  /**
   * Get the official website url of the course
   * @returns The official website url of the course
   */
  public getOfficialWebsiteUrl(): UrlValueObject | null {
    return this.officialWebsiteUrl;
  }

  /**
   * Get the course image url of the course
   * @returns The course image url of the course
   */
  public getCourseImageUrl(): UrlValueObject | null {
    return this.courseImageUrl;
  }

  /**
   * Set the description of the course
   * @param description - The description of the course
   */
  public setDescription(description: string): void {
    this.description = description;
    this.updatedAt = new Date();
  }

  /**
   * Set the source of the course
   * @param source - The source of the course
   */
  public setSource(source: string): void {
    this.source = source;
    this.updatedAt = new Date();
  }

  /**
   * Set the official website url of the course
   * @param officialWebsiteUrl - The official website url of the course
   */
  public setOfficialWebsiteUrl(officialWebsiteUrl: UrlValueObject): void {
    this.officialWebsiteUrl = officialWebsiteUrl;
    this.updatedAt = new Date();
  }

  /**
   * Set the course image url of the course
   * @param courseImageUrl - The course image url of the course
   */
  public setCourseImageUrl(courseImageUrl: UrlValueObject): void {
    this.courseImageUrl = courseImageUrl;
    this.updatedAt = new Date();
  }

  /**
   * Set the name of the course
   * @param name - The name of the course
   */
  public setName(name: string): void {
    this.name = name;
    this.updatedAt = new Date();
  }
}
