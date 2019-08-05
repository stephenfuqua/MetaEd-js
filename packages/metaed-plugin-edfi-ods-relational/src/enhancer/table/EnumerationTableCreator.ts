import R from 'ramda';
import { Namespace, MetaEdEnvironment } from 'metaed-core';
import { normalizeEnumerationSuffix } from 'metaed-core';
import { addColumns, newTable } from '../../model/database/Table';
import { ColumnTransformUnchanged } from '../../model/database/ColumnTransform';
import { newIntegerColumn, newStringColumn } from '../../model/database/Column';
import { Table } from '../../model/database/Table';

const removeTypeSuffix = R.when(R.endsWith('Type'), R.dropLast(4));

export const enumerationTableCreator: {
  build(metaEd: MetaEdEnvironment, name: string, namespace: Namespace, documentation: string): Table;
} = {
  // @ts-ignore "metaEd" unused here
  build(metaEd: MetaEdEnvironment, name: string, namespace: Namespace, documentation: string): Table {
    const normalizedName = normalizeEnumerationSuffix(name);
    const table: Table = Object.assign(newTable(), {
      name: normalizedName,
      nameComponents: [normalizedName],
      namespace,
      schema: namespace.namespaceName.toLowerCase(),
      description: documentation,
      includeCreateDateColumn: true,
      includeLastModifiedDateAndIdColumn: true,
      isAggregateRootTable: true,
    });
    addColumns(
      table,
      [
        Object.assign(newIntegerColumn(), {
          name: `${table.name}Id`,
          isIdentityDatabaseType: true,
          isPartOfPrimaryKey: true,
          isNullable: false,
          description: `Key for ${removeTypeSuffix(name)}`,
        }),
        Object.assign(newStringColumn('50'), {
          name: 'CodeValue',
          isPartOfPrimaryKey: false,
          isNullable: false,
          description: 'This column is deprecated.',
        }),
        Object.assign(newStringColumn('1024'), {
          name: 'Description',
          isPartOfPrimaryKey: false,
          isNullable: false,
          description: `The description for the ${removeTypeSuffix(name)} type.`,
        }),
        Object.assign(newStringColumn('450'), {
          name: 'ShortDescription',
          isPartOfPrimaryKey: false,
          isNullable: false,
          description: `The value for the ${removeTypeSuffix(name)} type.`,
        }),
      ],
      ColumnTransformUnchanged,
    );
    return table;
  },
};
