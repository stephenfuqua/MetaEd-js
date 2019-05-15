export interface EntityTable {
  table: string;
  isA: string | null;
  isAbstract: boolean;
  isRequiredCollection: boolean;
  schema: string;
  hasIsA: boolean;
  requiresSchema: boolean;
}
