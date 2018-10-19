// @flow
import type { MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import type { Table, Column, ForeignKey, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import { getPrimaryKeys } from 'metaed-plugin-edfi-ods';
import { changeQueryIndicated } from './ChangeQueryIndicator';
import { deleteTrackingTriggerEntities } from './EnhancerHelper';
import type { DeleteTrackingTrigger } from '../model/DeleteTrackingTrigger';

export type SuperclassForeignKeyFinder = (mainTable: Table) => ?ForeignKey;

// eslint-disable-next-line no-unused-vars
function defaultSuperclassForeignKeyFinder(mainTable: Table): ?ForeignKey {
  return null;
}

export function createDeleteTrackingTriggerFromTable(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
  mainTable: Table,
  foreignKeyToSuperclass: ?ForeignKey = null,
) {
  const deleteTrackingTrigger: DeleteTrackingTrigger = {
    triggerSchema: mainTable.schema,
    triggerName: `${mainTable.schema}_${mainTable.name}_TR_DeleteTracking`,
    targetTableSchema: mainTable.schema,
    targetTableName: mainTable.name,
    deleteTrackingTableSchema: 'changes',
    deleteTrackingTableName: `${mainTable.schema}_${mainTable.name}_TrackedDelete`,
    primaryKeyColumnNames: getPrimaryKeys(mainTable).map((column: Column) => column.name),
    targetTableIsSubclass: foreignKeyToSuperclass != null,
    foreignKeyToSuperclass,
  };

  deleteTrackingTriggerEntities(metaEd, namespace).push(deleteTrackingTrigger);
}

export function createDeleteTrackingTrigger(
  metaEd: MetaEdEnvironment,
  modelBase: ModelBase,
  superclassForeignKeyFinder: SuperclassForeignKeyFinder = defaultSuperclassForeignKeyFinder,
) {
  if (!changeQueryIndicated(metaEd)) return;
  const mainTable: Table = ((modelBase.data.edfiOds: any): TopLevelEntityEdfiOds).ods_EntityTable;
  if (mainTable == null) return;

  createDeleteTrackingTriggerFromTable(metaEd, modelBase.namespace, mainTable, superclassForeignKeyFinder(mainTable));
}
