import R from 'ramda';
import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { getForeignKeys, getPrimaryKeys } from '../model/database/Table';
import { getParentTableColumnNames } from '../model/database/ForeignKey';
import { tableEntities } from './EnhancerHelper';
import { Column } from '../model/database/Column';
import { ForeignKey } from '../model/database/ForeignKey';
import { Table } from '../model/database/Table';

// Calculate if a reverse foreign key index is required for each Foreign Key
const enhancerName = 'ForeignKeyReverseIndexEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const tables: Map<string, Table> = tableEntities(metaEd, namespace);
    tables.forEach((table: Table) => {
      const primaryKeyColumnNames: string[] = getPrimaryKeys(table).map((pk: Column) => pk.name);

      R.compose(
        R.forEach((fk: ForeignKey) => {
          fk.withReverseForeignKeyIndex = true;
        }),
        R.reject((fk: ForeignKey) => R.equals(getParentTableColumnNames(fk), primaryKeyColumnNames)),
      )(getForeignKeys(table));
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
