/**
 * Filter logic type
 * @description Filter logic type is an enum with the possible logic
 * this is used to connect multiple filters
 */
export enum FilterLogic {
  AND = "AND",
  OR = "OR",
}

/**
 * Filter operator type
 * @description Filter operator type is an enum with the possible operators
 */
export enum FilterOperator {
  EQUALS = "EQUALS",
  NOT_EQUALS = "NOT_EQUALS",
  IN = "IN",
  NOT_IN = "NOT_IN",
  HAS = "HAS",
  LESS_THAN = "LESS_THAN",
  LESS_THAN_OR_EQUAL_TO = "LESS_THAN_OR_EQUAL_TO",
  GREATER_THAN = "GREATER_THAN",
  GREATER_THAN_OR_EQUAL_TO = "GREATER_THAN_OR_EQUAL_TO",
  CONTAINS = "CONTAINS",
  STARTS_WITH = "STARTS_WITH",
  ENDS_WITH = "ENDS_WITH",
  BETWEEN = "BETWEEN",
}

/**
 * Filter type
 * @description Filter type is an object with a field, operator, and value
 * @field - The field to filter on
 * @operator - The operator to use for the filter
 * @value - The value to filter on
 */
export type FilterSingle = {
  field: string;
  operator: FilterOperator;
  value: any;
};

/**
 * Filter group type
 * @description Filter group type is an object with a connection and an array of items
 * @connection - The connection to use for the group
 * @items - The items to filter on
 */
export type FilterGroup = {
  connection: FilterLogic;
  items: FilterSingle[];
};

/**
 * Filter type
 * @description Filter type is a single filter or a group of filters
 */
export type Filter = FilterSingle | FilterGroup;

/**
 * Filters type
 * @description Filters type is an array of Filter objects
 */
export type Filters = Filter[];
