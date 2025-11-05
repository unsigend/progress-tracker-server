/**
 * Course response DTO
 * @description Course response DTO which is used to return the course information.
 */
export class CourseResponseDto {
  /** The id of the course */
  id: string;

  /** The name of the course */
  name: string;

  /** The description of the course */
  description: string | null;

  /** The source of the course */
  source: string | null;

  /** The official website url of the course */
  officialWebsiteUrl: string | null;

  /** The course image url of the course */
  courseImageUrl: string | null;

  /** The created at of the course */
  createdAt: Date;

  /** The updated at of the course */
  updatedAt: Date;

  /** The created by of the course */
  createdById: string;
}
