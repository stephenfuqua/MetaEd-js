import { DeleteTrackingTrigger, getPrimaryKeys } from 'metaed-plugin-edfi-ods-changequery';
import { Table, Column } from 'metaed-plugin-edfi-ods-relational';
import { TARGET_DATABASE_PLUGIN_NAME } from './EnhancerHelper';

export function createDeleteTrackingTriggerModel(mainTable: Table): DeleteTrackingTrigger {
  return {
    triggerSchema: mainTable.schema,
    triggerName: `${mainTable.schema}_${mainTable.data.edfiOdsSqlServer.tableName}_TR_DeleteTracking`,
    targetTableSchema: mainTable.schema,
    targetTableName: mainTable.data.edfiOdsSqlServer.tableName,
    deleteTrackingTableSchema: 'changes',
    deleteTrackingTableName: `${mainTable.schema}_${mainTable.data.edfiOdsSqlServer.tableName}_TrackedDelete`,
    primaryKeyColumnNames: getPrimaryKeys(mainTable, TARGET_DATABASE_PLUGIN_NAME).map(
      (column: Column) => column.data.edfiOdsSqlServer.columnName,
    ),
    targetTableIsSubclass: false,
    foreignKeyToSuperclass: null,
  };
}
