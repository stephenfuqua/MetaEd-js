export interface ForeignKeyEdfiOdsSqlServer {
  nameSuffix: string;
  foreignKeyName: string;
  parentTableColumnNames: string[];
  foreignTableColumnNames: string[];
}
