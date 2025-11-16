// import dependencies
import { ValidationException } from "@/shared/domain/exceptions/validation.exception";
import { Injectable } from "@nestjs/common";

// import queries
import { QueryBase } from "@shared/domain/queries/base.query";
import {
  FilterLogic,
  FilterOperator,
  FilterSingle,
  FilterGroup,
} from "@shared/domain/queries/filter";

/**
 * Prisma service for prisma utilities
 * @description Prisma service
 */
@Injectable()
export class PrismaService {
  private readonly NULL_STRING = "null" as const;
  constructor() {}

  /**
   * Map filter operator to prisma operator
   * @param operator - The filter operator
   * @returns The prisma operator
   */
  private mapOperatorToPrisma(operator: FilterOperator): string {
    switch (operator) {
      case FilterOperator.EQUALS:
        return "equals";
      case FilterOperator.NOT_EQUALS:
        return "not";
      case FilterOperator.IN:
        return "in";
      case FilterOperator.NOT_IN:
        return "notIn";
      case FilterOperator.HAS:
        return "has";
      case FilterOperator.LESS_THAN:
        return "lt";
      case FilterOperator.LESS_THAN_OR_EQUAL_TO:
        return "lte";
      case FilterOperator.GREATER_THAN:
        return "gt";
      case FilterOperator.GREATER_THAN_OR_EQUAL_TO:
        return "gte";
      case FilterOperator.CONTAINS:
        return "contains";
      case FilterOperator.STARTS_WITH:
        return "startsWith";
      case FilterOperator.ENDS_WITH:
        return "endsWith";
      case FilterOperator.BETWEEN:
        return this.NULL_STRING;
      default:
        return operator;
    }
  }

  /**
   * Build a single filter clause from FilterSingle
   * @param filter - The filter single to build
   * @returns The filter clause object
   */
  private buildFilterSingleClause(
    filter: FilterSingle,
  ): Record<string, object> {
    // special case for between operator
    if (filter.operator === FilterOperator.BETWEEN) {
      if (!Array.isArray(filter.value) || filter.value.length !== 2) {
        throw new ValidationException(
          "BETWEEN operator requires array with [start, end]",
        );
      }

      return {
        [filter.field]: {
          gte: (filter.value as unknown[])[0],
          lte: (filter.value as unknown[])[1],
        },
      };
    } else {
      const fieldClause: Record<string, any> = {
        [this.mapOperatorToPrisma(filter.operator)]: filter.value as Record<
          string,
          any
        >,
      };

      if (
        [
          FilterOperator.CONTAINS,
          FilterOperator.STARTS_WITH,
          FilterOperator.ENDS_WITH,
        ].includes(filter.operator)
      ) {
        fieldClause["mode"] = "insensitive";
      }

      return {
        [filter.field]: fieldClause,
      };
    }
  }

  /**
   * Build a filter group clause
   * @param filterGroup - The filter group to build
   * @returns The group clause object
   */
  private buildFilterGroupClause(
    filterGroup: FilterGroup,
  ): Record<string, any> {
    const groupItems: Record<string, any>[] = [];

    // FilterGroup.items contains only FilterSingle[]
    for (const filterSingle of filterGroup.items) {
      groupItems.push(this.buildFilterSingleClause(filterSingle));
    }

    // If no items, return empty object
    if (groupItems.length === 0) {
      return {};
    }

    // Connect items using the group's connection logic
    if (filterGroup.connection === FilterLogic.AND) {
      return { AND: groupItems };
    } else {
      return { OR: groupItems };
    }
  }

  /**
   * Build clauses from query
   * @param query - The query object
   * @returns The where clause and the order clause
   * @description The where clause is an object with the fields and the values to filter on
   *  will build the where clause and order clause
   *  the where clause format like eg:
   *  {
   *    AND | OR: [
   *      {
   *        field: { operator: value },
   *      },
   *      ...
   *    ]
   *  }
   *  Supports 2-level nesting: FilterGroup can contain FilterSingle[], and Filters can contain both FilterSingle and FilterGroup
   *  Example: (A AND B) OR (C AND D) where (C AND D) is a FilterGroup
   */
  buildClause<WhereClauseGeneric = any, OrderClauseGeneric = any>(
    query: QueryBase,
  ): {
    whereClause: WhereClauseGeneric;
    orderClause: OrderClauseGeneric;
  } {
    const whereClause = {} as WhereClauseGeneric;
    const orderClause = {} as OrderClauseGeneric;

    // build order clause
    orderClause[query.getSort()] = query.getOrder();

    // build where clause
    const whereClauseItems = [] as Record<string, any>[];

    if (query.getFilters().length === 0) {
      return { whereClause, orderClause };
    }

    // build where clause items
    for (const filter of query.getFilters()) {
      if ("field" in filter && "operator" in filter) {
        // If it is a Single Filter
        whereClauseItems.push(this.buildFilterSingleClause(filter));
      } else if ("connection" in filter && "items" in filter) {
        // If it is a Composite Filter
        const groupClause = this.buildFilterGroupClause(filter);
        // Only add if group has items
        if (Object.keys(groupClause).length > 0) {
          whereClauseItems.push(groupClause);
        }
      }
    }

    // connect the clauses using logic
    if (query.getConnection() === FilterLogic.AND) {
      whereClause["AND"] = whereClauseItems;
    } else {
      whereClause["OR"] = whereClauseItems;
    }

    return { whereClause, orderClause };
  }
}
