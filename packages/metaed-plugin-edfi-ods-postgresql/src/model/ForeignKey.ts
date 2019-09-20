export interface ForeignKeyEdfiOdsPostgresql {
  nameSuffix: string;
  foreignKeyName: string;
  parentTableColumnNames: string[];
  foreignTableColumnNames: string[];
}
