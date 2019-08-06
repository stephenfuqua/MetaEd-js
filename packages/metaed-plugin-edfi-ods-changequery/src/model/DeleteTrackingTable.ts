import { Column } from 'metaed-plugin-edfi-ods-relational';

export interface DeleteTrackingTable {
  schema: string;
  tableName: string;
  columns: Column[];
  primaryKeyName: string;
  primaryKeyColumns: Column[];
}
