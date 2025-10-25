// import dependencies
import { Injectable } from "@nestjs/common";

// import queries
import { QueryBase } from "@shared/domain/queries/base.query";
import { FilterLogic, FilterOperator } from "@shared/domain/queries/filter";

/**
 * Prisma service for prisma utilities
 * @description Prisma service
 */
@Injectable()
export class PrismaService {
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
      default:
        return operator;
    }
  }

  /**
   * Build clause from query
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
    const whereClauseItems = [] as Record<string, object>[];

    if (query.getFilters().length === 0) {
      return { whereClause, orderClause };
    }

    // build where clause items
    for (const filter of query.getFilters()) {
      const filedClause: Record<string, any> = {
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
        filedClause["mode"] = "insensitive";
      }

      whereClauseItems.push({
        [filter.field]: filedClause,
      });
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
