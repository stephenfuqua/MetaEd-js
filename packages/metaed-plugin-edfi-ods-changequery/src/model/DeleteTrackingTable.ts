import { Column } from 'metaed-plugin-edfi-ods';

export type DeleteTrackingTable = {
  schema: string;
  tableName: string;
  columns: Array<Column>;
  primaryKeyName: string;
  primaryKeyColumns: Array<Column>;
};
