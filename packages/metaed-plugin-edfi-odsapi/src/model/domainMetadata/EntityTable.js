// @flow
export type EntityTable = {
  table: string,
  isA: ?string,
  isAbstract: boolean,
  isRequiredCollection: boolean,
  schema: string,
  hasIsA: boolean,
  requiresSchema: boolean,
};
