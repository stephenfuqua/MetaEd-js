import { ForeignKey } from 'metaed-plugin-edfi-ods';

export type DeleteTrackingTrigger = {
  triggerSchema: string;
  triggerName: string;
  targetTableSchema: string;
  targetTableName: string;
  deleteTrackingTableSchema: string;
  deleteTrackingTableName: string;
  primaryKeyColumnNames: Array<string>;
  targetTableIsSubclass: boolean;
  foreignKeyToSuperclass: ForeignKey | null;
};
