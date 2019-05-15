import { Column } from 'metaed-plugin-edfi-ods';

export interface DeleteTrackingTable {
  schema: string;
  tableName: string;
  columns: Column[];
  primaryKeyName: string;
  primaryKeyColumns: Column[];
}
