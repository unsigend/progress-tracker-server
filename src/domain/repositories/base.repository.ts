// import dependencies
import { QueryBase } from "../queries/base.query";

/**
 * Abstract base repository interface
 * @description Abstract base repository interface
 */
export interface BaseRepository<EntityType> {
  /**
   * Save an entity
   * @param entity - The entity to save
   * @returns void
   */
  save(entity: EntityType): Promise<void>;

  /**
   * Find an entity by id
   * @param id - The id of the entity
   * @returns The entity or null if not found
   */
  findById(id: string): Promise<EntityType | null>;

  /**
   * Find all entities
   * @param query - The query to find the entities
   * @returns The entities and the total count of the entities
   */
  findAll(
    query: QueryBase,
  ): Promise<{ data: EntityType[]; totalCount: number }>;

  /**
   * Delete an entity by id
   * @param id - The id of the entity
   * @returns True if the entity was deleted, false otherwise
   */
  delete(id: string): Promise<boolean>;
}
