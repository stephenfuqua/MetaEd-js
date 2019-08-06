import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { tableEntities, Table, Column } from 'metaed-plugin-edfi-ods-relational';

export interface TableEdfiOdsSqlServer {
  tableName: string;
}

const enhancerName = 'SqlServerTableSetupEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const tables: Map<string, Table> = tableEntities(metaEd, namespace);

    tables.forEach((table: Table) => {
      if (table.data.edfiOdsSqlServer == null) table.data.edfiOdsSqlServer = { tableName: '' };

      table.columns.forEach((column: Column) => {
        if (column.data.edfiOdsSqlServer == null) column.data.edfiOdsSqlServer = { columnName: '', dataType: 'unknown' };
      });

      table.foreignKeys.forEach(foreignKey => {
        if (foreignKey.data.edfiOdsSqlServer == null)
          foreignKey.data.edfiOdsSqlServer = {
            nameSuffix: '',
            name: '',
            parentTableColumnNames: [],
            foreignTableColumnNames: [],
          };
      });
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
