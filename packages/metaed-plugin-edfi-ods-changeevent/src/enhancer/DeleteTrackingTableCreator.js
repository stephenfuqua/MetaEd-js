// @flow
import type { MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import type { Table, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import { getPrimaryKeys, newColumn } from 'metaed-plugin-edfi-ods';
import { changeEventIndicated } from './ChangeEventIndicator';
import { deleteTrackingTableEntities, enableChangeTrackingEntities } from './EnhancerHelper';
import type { DeleteTrackingTable } from '../model/DeleteTrackingTable';
import type { EnableChangeTracking } from '../model/EnableChangeTracking';

export function createDeleteTrackingTableFromTable(metaEd: MetaEdEnvironment, namespace: Namespace, mainTable: Table) {
  const tableName = `${mainTable.schema}_${mainTable.name}_TrackedDelete`;
  const mainTablePrimaryKeys = getPrimaryKeys(mainTable);
  const deleteTrackingTable: DeleteTrackingTable = {
    schema: 'changes',
    tableName,
    primaryKeyName: `PK_${tableName}`,
    columns: [...mainTablePrimaryKeys],
    primaryKeyColumns: [...mainTablePrimaryKeys],
  };

  deleteTrackingTable.columns.push({
    ...newColumn(),
    name: 'Id',
    dataType: 'uniqueidentifier',
    isNullable: false,
  });

  deleteTrackingTable.columns.push({
    ...newColumn(),
    name: 'SystemChangeVersion',
    dataType: 'bigint',
    isNullable: false,
  });

  const enableChangeTracking: EnableChangeTracking = { schema: mainTable.schema, tableName: mainTable.name };

  deleteTrackingTableEntities(metaEd, namespace).push(deleteTrackingTable);
  enableChangeTrackingEntities(metaEd, namespace).push(enableChangeTracking);
}

export function createDeleteTrackingTable(metaEd: MetaEdEnvironment, modelBase: ModelBase) {
  if (!changeEventIndicated(metaEd)) return;
  const mainTable: Table = ((modelBase.data.edfiOds: any): TopLevelEntityEdfiOds).ods_EntityTable;
  if (mainTable == null) return;

  createDeleteTrackingTableFromTable(metaEd, modelBase.namespace, mainTable);
}
