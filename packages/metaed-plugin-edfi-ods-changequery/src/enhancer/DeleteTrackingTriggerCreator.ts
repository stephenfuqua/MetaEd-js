import { MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import { Table, Column, ForeignKey, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods';
import { getPrimaryKeys } from 'metaed-plugin-edfi-ods';
import { changeQueryIndicated } from './ChangeQueryIndicator';
import { deleteTrackingTriggerEntities } from './EnhancerHelper';
import { DeleteTrackingTrigger } from '../model/DeleteTrackingTrigger';

export type SuperclassForeignKeyFinder = (mainTable: Table) => ForeignKey | undefined;

function defaultSuperclassForeignKeyFinder(_mainTable: Table): ForeignKey | undefined {
  return undefined;
}

export function createDeleteTrackingTriggerFromTable(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
  mainTable: Table,
  foreignKeyToSuperclass: ForeignKey | null = null,
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
  const mainTable: Table = (modelBase.data.edfiOds as TopLevelEntityEdfiOds).odsEntityTable;
  if (mainTable == null) return;

  createDeleteTrackingTriggerFromTable(metaEd, modelBase.namespace, mainTable, superclassForeignKeyFinder(mainTable));
}
