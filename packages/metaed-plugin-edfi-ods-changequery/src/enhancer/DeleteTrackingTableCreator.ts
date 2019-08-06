import { MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import { Table, Column, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods-relational';
import { newColumn } from 'metaed-plugin-edfi-ods-relational';
import { changeQueryIndicated } from './ChangeQueryIndicator';
import { deleteTrackingTableEntities, getPrimaryKeys } from './EnhancerHelper';
import { DeleteTrackingTable } from '../model/DeleteTrackingTable';

export function createDeleteTrackingTableFromTable(metaEd: MetaEdEnvironment, namespace: Namespace, mainTable: Table) {
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
    columns: [...getPrimaryKeys(mainTable)],
    primaryKeyColumns: [changeVersionColumn],
  };

  deleteTrackingTable.columns.push({
    ...newColumn(),
    columnId: 'Id',
    data: { edfiOdsSqlServer: { columnName: 'Id', dataType: 'uniqueidentifier' } },
    isNullable: false,
  });

  deleteTrackingTable.columns.push(changeVersionColumn);

  deleteTrackingTableEntities(metaEd, namespace).push(deleteTrackingTable);
}

export function createDeleteTrackingTable(metaEd: MetaEdEnvironment, modelBase: ModelBase) {
  if (!changeQueryIndicated(metaEd)) return;
  const mainTable: Table = (modelBase.data.edfiOdsRelational as TopLevelEntityEdfiOds).odsEntityTable;
  if (mainTable == null) return;

  createDeleteTrackingTableFromTable(metaEd, modelBase.namespace, mainTable);
}
