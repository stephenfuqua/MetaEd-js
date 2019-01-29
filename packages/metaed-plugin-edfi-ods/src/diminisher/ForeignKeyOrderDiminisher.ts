import R from 'ramda';
import { versionSatisfies } from 'metaed-core';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { getForeignKeys } from '../model/database/Table';
import { tableEntities } from '../enhancer/EnhancerHelper';
import { Column } from '../model/database/Column';
import { ColumnNamePair } from '../model/database/ColumnNamePair';
import { ForeignKey } from '../model/database/ForeignKey';
import { Table } from '../model/database/Table';

// METAED-630
// Orders foreign key columns to match EdFi DS 2.x
// Depends on PrimaryKeyOrderDiminisher
const enhancerName = 'ForeignKeyOrderDiminisher';
const targetVersions = '2.x';

const schemaName = 'edfi';

function modifyForeignKeyColumnOrder(tablesForCoreNamespace: Map<string, Table>): void {
  const foreignKeys: Array<ForeignKey> = R.chain((table: Table) =>
    getForeignKeys(table).filter((fk: ForeignKey) => fk.columnNames.length > 1 && fk.foreignTableSchema === schemaName),
  )([...tablesForCoreNamespace.values()]);
  if (foreignKeys.length === 0) return;

  foreignKeys.forEach((fk: ForeignKey) => {
    const foreignTable: Table | undefined = tablesForCoreNamespace.get(fk.foreignTableName);
    if (foreignTable == null) return;

    const primaryKeyOrder: Array<string> = foreignTable.primaryKeys.map((pk: Column) => pk.name);
    const foreignKeyColumnPairLookup: { [foreignKeyName: string]: ColumnNamePair } = R.groupBy(
      R.prop('foreignTableColumnName'),
      fk.columnNames,
    );
    // eslint-disable-next-line no-underscore-dangle
    const foreignKeyColumnPairFor: (foreignKeyName: string) => ColumnNamePair = R.prop(R.__, foreignKeyColumnPairLookup);

    const foreignKeyOrder: Array<ColumnNamePair> = R.chain((pkName: string) => foreignKeyColumnPairFor(pkName))(
      primaryKeyOrder,
    );

    fk.parentTableColumnNames = foreignKeyOrder.map((x: ColumnNamePair) => x.parentTableColumnName);
    fk.foreignTableColumnNames = foreignKeyOrder.map((x: ColumnNamePair) => x.foreignTableColumnName);
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('EdFi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const tablesForCoreNamespace: Map<string, Table> = tableEntities(metaEd, coreNamespace);

  modifyForeignKeyColumnOrder(tablesForCoreNamespace);

  return {
    enhancerName,
    success: true,
  };
}
