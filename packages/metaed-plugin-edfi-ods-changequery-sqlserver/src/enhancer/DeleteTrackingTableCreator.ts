import { Column, newColumn, Table } from 'metaed-plugin-edfi-ods-relational';
import { DeleteTrackingTable, getPrimaryKeys } from 'metaed-plugin-edfi-ods-changequery';
import { TARGET_DATABASE_PLUGIN_NAME } from './EnhancerHelper';

export function createDeleteTrackingTableModel(mainTable: Table): DeleteTrackingTable {
  const tableName = `${mainTable.schema}_${mainTable.data.edfiOdsSqlServer.tableName}_TrackedDelete`;

  const changeVersionColumn: Column = {
    ...newColumn(),
    columnId: 'ChangeVersion',
    data: { edfiOdsSqlServer: { columnName: 'ChangeVersion', dataType: 'bigint' } },
    isNullable: false,
  };

  const deleteTrackingTable: DeleteTrackingTable = {
    schema: 'changes',
    tableName,
    primaryKeyName: `PK_${tableName}`,
    columns: [...getPrimaryKeys(mainTable, TARGET_DATABASE_PLUGIN_NAME)],
    primaryKeyColumns: [changeVersionColumn],
  };

  deleteTrackingTable.columns.push({
    ...newColumn(),
    columnId: 'Id',
    data: { edfiOdsSqlServer: { columnName: 'Id', dataType: 'uniqueidentifier' } },
    isNullable: false,
  });

  deleteTrackingTable.columns.push(changeVersionColumn);

  return deleteTrackingTable;
}
