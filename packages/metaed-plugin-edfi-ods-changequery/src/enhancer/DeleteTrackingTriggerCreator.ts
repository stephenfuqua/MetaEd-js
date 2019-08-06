import R from 'ramda';
import { MetaEdEnvironment, ModelBase, Namespace } from 'metaed-core';
import { Table, Column, ForeignKey, TopLevelEntityEdfiOds } from 'metaed-plugin-edfi-ods-relational';
import { changeQueryIndicated } from './ChangeQueryIndicator';
import { deleteTrackingTriggerEntities, getPrimaryKeys } from './EnhancerHelper';
import { DeleteTrackingTrigger } from '../model/DeleteTrackingTrigger';
import { PairedForeignKeyColumnName } from '../model/PairedForeignKeyColumnName';

export type SuperclassForeignKeyFinder = (mainTable: Table) => ForeignKey | undefined;

function defaultSuperclassForeignKeyFinder(_mainTable: Table): ForeignKey | undefined {
  return undefined;
}

function pairUpForeignKeyColumnNames(
  parentTableColumnName: string,
  foreignTableColumnName: string,
): PairedForeignKeyColumnName {
  return { parentTableColumnName, foreignTableColumnName };
}

export function createDeleteTrackingTriggerFromTable(
  metaEd: MetaEdEnvironment,
  namespace: Namespace,
  mainTable: Table,
  foreignKeyToSuperclass: ForeignKey | null = null,
) {
  const deleteTrackingTrigger: DeleteTrackingTrigger = {
    triggerSchema: mainTable.schema,
    triggerName: `${mainTable.schema}_${mainTable.data.edfiOdsSqlServer.tableName}_TR_DeleteTracking`,
    targetTableSchema: mainTable.schema,
    targetTableName: mainTable.data.edfiOdsSqlServer.tableName,
    deleteTrackingTableSchema: 'changes',
    deleteTrackingTableName: `${mainTable.schema}_${mainTable.data.edfiOdsSqlServer.tableName}_TrackedDelete`,
    primaryKeyColumnNames: getPrimaryKeys(mainTable).map((column: Column) => column.data.edfiOdsSqlServer.columnName),
    targetTableIsSubclass: foreignKeyToSuperclass != null,
    foreignKeyToSuperclass,
  };

  deleteTrackingTriggerEntities(metaEd, namespace).push(deleteTrackingTrigger);

  if (foreignKeyToSuperclass != null) {
    if (foreignKeyToSuperclass.data.edfiOdsChangeQuery == null) foreignKeyToSuperclass.data.edfiOdsChangeQuery = {};
    const pairedForeignKeyColumnNames: PairedForeignKeyColumnName[] = R.zipWith(
      pairUpForeignKeyColumnNames,
      foreignKeyToSuperclass.data.edfiOdsSqlServer.parentTableColumnNames,
      foreignKeyToSuperclass.data.edfiOdsSqlServer.foreignTableColumnNames,
    );
    foreignKeyToSuperclass.data.edfiOdsChangeQuery.columnNames = pairedForeignKeyColumnNames.sort((a, b) =>
      a.parentTableColumnName.localeCompare(b.parentTableColumnName),
    );
  }
}

export function createDeleteTrackingTrigger(
  metaEd: MetaEdEnvironment,
  modelBase: ModelBase,
  superclassForeignKeyFinder: SuperclassForeignKeyFinder = defaultSuperclassForeignKeyFinder,
) {
  if (!changeQueryIndicated(metaEd)) return;
  const mainTable: Table = (modelBase.data.edfiOdsRelational as TopLevelEntityEdfiOds).odsEntityTable;
  if (mainTable == null) return;

  createDeleteTrackingTriggerFromTable(metaEd, modelBase.namespace, mainTable, superclassForeignKeyFinder(mainTable));
}
