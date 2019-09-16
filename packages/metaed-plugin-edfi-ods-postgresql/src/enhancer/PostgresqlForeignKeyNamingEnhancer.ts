import { EnhancerResult, MetaEdEnvironment, Namespace, orderByPath } from 'metaed-core';
import {
  tableEntities,
  Table,
  ForeignKey,
  getParentTableColumns,
  getForeignTableColumns,
  Column,
} from 'metaed-plugin-edfi-ods-relational';

const enhancerName = 'PostgresqlForeignKeyNamingEnhancer';

function suffixDuplicates(foreignKeysWithDuplicateForeignTables: ForeignKey[]) {
  foreignKeysWithDuplicateForeignTables.forEach((foreignKey, index) => {
    if (index > 0) {
      foreignKey.data.edfiOdsPostgresql.nameSuffix = `${index}`;
    }
  });
}

function generateSuffixes(foreignKeys: ForeignKey[]) {
  foreignKeys.forEach(foreignKey => {
    const foreignKeysWithDuplicateForeignTables: ForeignKey[] = foreignKeys.filter(
      fk => fk.foreignTableId === foreignKey.foreignTableId && foreignKey.data.edfiOdsPostgresql.nameSuffix === '',
    );
    if (foreignKeysWithDuplicateForeignTables.length > 1) suffixDuplicates(foreignKeysWithDuplicateForeignTables);
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const tables: Map<string, Table> = tableEntities(metaEd, namespace);

    tables.forEach((table: Table) => {
      // foreign key numeric suffixes to resolve duplicate names
      generateSuffixes(table.foreignKeys);

      // add column names
      table.foreignKeys.forEach(foreignKey => {
        foreignKey.data.edfiOdsPostgresql.foreignKeyName = `FK_${
          foreignKey.parentTable.data.edfiOdsPostgresql.tableNameHashTruncated
        }_${foreignKey.foreignTable.data.edfiOdsPostgresql.tableName}${foreignKey.data.edfiOdsPostgresql.nameSuffix}`;

        const foreignTable: Table | undefined = tableEntities(metaEd, foreignKey.foreignTableNamespace).get(
          foreignKey.foreignTableId,
        );
        foreignKey.data.edfiOdsPostgresql.parentTableColumnNames = getParentTableColumns(foreignKey, foreignTable).map(
          (c: Column) => c.data.edfiOdsPostgresql.columnName,
        );
        foreignKey.data.edfiOdsPostgresql.foreignTableColumnNames = getForeignTableColumns(foreignKey, foreignTable).map(
          (c: Column) => c.data.edfiOdsPostgresql.columnName,
        );
      });

      // sort foreign keys in order
      table.foreignKeys = orderByPath(['data', 'edfiOdsPostgresql', 'foreignKeyName'])(table.foreignKeys);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
