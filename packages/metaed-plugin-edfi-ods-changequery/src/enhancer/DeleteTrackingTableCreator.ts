import { MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import { Table, Column, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import { getPrimaryKeys, newColumn } from 'metaed-plugin-edfi-ods';
import { changeQueryIndicated } from './ChangeQueryIndicator';
import { deleteTrackingTableEntities } from './EnhancerHelper';
import { DeleteTrackingTable } from '../model/DeleteTrackingTable';

export function createDeleteTrackingTableFromTable(metaEd: MetaEdEnvironment, namespace: Namespace, mainTable: Table) {
  const tableName = `${mainTable.schema}_${mainTable.name}_TrackedDelete`;
  const mainTablePrimaryKeys = getPrimaryKeys(mainTable);
  const changeVersionColumn: Column = {
    ...newColumn(),
    name: 'ChangeVersion',
    dataType: 'bigint',
    isNullable: false,
  };

  const deleteTrackingTable: DeleteTrackingTable = {
    schema: 'changes',
    tableName,
    primaryKeyName: `PK_${tableName}`,
    columns: [...mainTablePrimaryKeys],
    primaryKeyColumns: [changeVersionColumn],
  };

  deleteTrackingTable.columns.push({
    ...newColumn(),
    name: 'Id',
    dataType: 'uniqueidentifier',
    isNullable: false,
  });

  deleteTrackingTable.columns.push(changeVersionColumn);

  deleteTrackingTableEntities(metaEd, namespace).push(deleteTrackingTable);
}

export function createDeleteTrackingTable(metaEd: MetaEdEnvironment, modelBase: ModelBase) {
  if (!changeQueryIndicated(metaEd)) return;
  const mainTable: Table = (modelBase.data.edfiOds as TopLevelEntityEdfiOds).odsEntityTable;
  if (mainTable == null) return;

  createDeleteTrackingTableFromTable(metaEd, modelBase.namespace, mainTable);
}
