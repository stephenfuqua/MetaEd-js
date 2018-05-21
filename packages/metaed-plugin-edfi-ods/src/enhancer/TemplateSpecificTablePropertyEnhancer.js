// @flow
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { versionSatisfies, V3OrGreater } from 'metaed-core';
import {
  hasAlternateKeys,
  getAllColumns,
  getPrimaryKeys,
  getAlternateKeys,
  getUniqueIndexes,
  getForeignKeys,
  getForeignKeyName,
} from '../model/database/Table';
import { escapeSqlSingleQuote } from '../shared/Utility';
import { getForeignTableColumnNames, getParentTableColumnNames } from '../model/database/ForeignKey';
import { tableEntities } from './EnhancerHelper';
import type { Column } from '../model/database/Column';
import type { ForeignKey } from '../model/database/ForeignKey';
import type { Table } from '../model/database/Table';

// Sets sorted table properties for use by the generator template
const enhancerName: string = 'TemplateSpecificTablePropertyEnhancer';
const targetVersions: string = V3OrGreater;

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };
  metaEd.namespace.forEach((namespace: Namespace) => {
    const tables: Map<string, Table> = tableEntities(metaEd, namespace);

    tables.forEach((table: Table) => {
      table.columns.forEach((column: Column) =>
        Object.assign(column, {
          sqlEscapedDescription: escapeSqlSingleQuote(column.description),
        }),
      );
      Object.assign(table, {
        sqlEscapedDescription: escapeSqlSingleQuote(table.description),
        hasAlternateKeys: hasAlternateKeys(table),
        alternateKeys: getAlternateKeys(table),
        columns: getAllColumns(table),
        primaryKeys: table.primaryKeys.length === 0 ? getPrimaryKeys(table) : table.primaryKeys,
        uniqueIndexes: getUniqueIndexes(table),
        isTypeTable: table.name.endsWith('Type'),
      });

      table.foreignKeys.forEach((foreignKey: ForeignKey) => {
        const foreignTableNamespace: ?Namespace = metaEd.namespace.get(foreignKey.foreignTableSchema);
        // something is very wrong if namespace is not there, but for now just ignore
        if (foreignTableNamespace == null) return;

        const foreignTable: ?Table = tableEntities(metaEd, foreignTableNamespace).get(foreignKey.foreignTableName);

        Object.assign(foreignKey, {
          name: getForeignKeyName(foreignKey),
          parentTableColumnNames: getParentTableColumnNames(foreignKey, foreignTable),
          foreignTableColumnNames: getForeignTableColumnNames(foreignKey, foreignTable),
        });
        table.foreignKeys = getForeignKeys(table);
      });
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
