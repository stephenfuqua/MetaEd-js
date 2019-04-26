import { Namespace, MetaEdEnvironment } from 'metaed-core';
import { addColumns, newTable } from '../../model/database/Table';
import { ColumnTransformUnchanged } from '../../model/database/ColumnTransform';
import { newBooleanColumn, newShortColumn, newStringColumn } from '../../model/database/Column';
import { Table } from '../../model/database/Table';

export const schoolYearEnumerationTableCreator: {
  build(metaEd: MetaEdEnvironment, namespace: Namespace, documentation: string): Table;
} = {
  // @ts-ignore - "metaEd" is never read
  build(metaEd: MetaEdEnvironment, namespace: Namespace, documentation: string): Table {
    const table: Table = Object.assign(newTable(), {
      name: 'SchoolYearType',
      nameComponents: ['SchoolYearType'],
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
        Object.assign(newShortColumn(), {
          name: 'SchoolYear',
          isPartOfPrimaryKey: true,
          isNullable: false,
          description: 'Key for School Year',
        }),
        Object.assign(newStringColumn('50'), {
          name: 'SchoolYearDescription',
          isPartOfPrimaryKey: false,
          isNullable: false,
          description: 'The description for the SchoolYear type.',
        }),
        Object.assign(newBooleanColumn(), {
          name: 'CurrentSchoolYear',
          isPartOfPrimaryKey: false,
          isNullable: false,
          description: 'The code for the current school year.',
        }),
      ],
      ColumnTransformUnchanged,
    );
    return table;
  },
};
