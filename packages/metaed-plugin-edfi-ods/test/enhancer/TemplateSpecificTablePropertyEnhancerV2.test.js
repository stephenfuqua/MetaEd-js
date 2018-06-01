// @flow
import R from 'ramda';
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/TemplateSpecificTablePropertyEnhancerV2';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import type { Column } from '../../src/model/database/Column';
import type { Table } from '../../src/model/database/Table';

describe('when TemplateSpecificTablePropertyEnhancer enhances table with alternate keys', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName: string = 'TableName';
  const alternateKeyName1: string = 'AlternateKeyName1';
  const alternateKeyName2: string = 'AlternateKeyName2';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      schema: namespace.namespaceName,
      columns: [
        Object.assign(newColumn(), {
          name: alternateKeyName2,
          isPartOfAlternateKey: true,
        }),
        Object.assign(newColumn(), {
          name: 'ColumnName',
        }),
        Object.assign(newColumn(), {
          name: alternateKeyName1,
          isPartOfAlternateKey: true,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have hasAlternateKeys property set to true', () => {
    // $FlowIgnore - null check
    expect(tableEntities(metaEd, namespace).get(tableName).hasAlternateKeys).toBe(true);
  });

  it('should have correct alternate key order', () => {
    // $FlowIgnore - null check
    const { alternateKeys }: Array<Column> = tableEntities(metaEd, namespace).get(tableName);
    expect(alternateKeys).toHaveLength(2);
    expect(alternateKeys.map(x => x.name)).toEqual([alternateKeyName1, alternateKeyName2]);
  });
});

describe('when TemplateSpecificTablePropertyEnhancer enhances table with primary keys', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName: string = 'TableName';
  const primaryKeyName1: string = 'PrimaryKeyName1';
  const primaryKeyName2: string = 'PrimaryKeyName2';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      schema: namespace.namespaceName,
      columns: [
        Object.assign(newColumn(), {
          name: primaryKeyName2,
          isPartOfPrimaryKey: true,
        }),
        Object.assign(newColumn(), {
          name: 'ColumnName',
        }),
        Object.assign(newColumn(), {
          name: primaryKeyName1,
          isPartOfPrimaryKey: true,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have correct primary key order', () => {
    // $FlowIgnore - null check
    const { primaryKeys }: Array<Column> = tableEntities(metaEd, namespace).get(tableName);
    expect(primaryKeys).toHaveLength(2);
    expect(primaryKeys.map(x => x.name)).toEqual([primaryKeyName1, primaryKeyName2]);
  });
});

describe('when TemplateSpecificTablePropertyEnhancer enhances table with foreign keys', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName: string = 'TableName';
  const parentTableName1: string = 'ParentTableName1';
  const foreignTableName1: string = 'ForeignTableName1';
  const parentTableName2: string = 'ParentTableName2';
  const foreignTableName2: string = 'ForeignTableName2';
  const foreignTableColumnName1: string = 'ForeignTableColumnName1';
  const foreignTableColumnName2: string = 'ForeignTableColumnName2';
  const parentTableColumnName1: string = 'ParentTableColumnName1';
  const parentTableColumnName2: string = 'ParentTableColumnName2';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      schema: namespace.namespaceName,
      foreignKeys: [
        Object.assign(newForeignKey(), {
          parentTableName: parentTableName1,
          foreignTableName: foreignTableName1,
          parentTableSchema: namespace.namespaceName,
          foreignTableSchema: namespace.namespaceName,
        }),
        Object.assign(newForeignKey(), {
          parentTableName: parentTableName2,
          foreignTableName: foreignTableName2,
          parentTableSchema: namespace.namespaceName,
          foreignTableSchema: namespace.namespaceName,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: parentTableColumnName2,
              foreignTableColumnName: foreignTableColumnName2,
            }),
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: parentTableColumnName1,
              foreignTableColumnName: foreignTableColumnName1,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have correct foreign key order', () => {
    // $FlowIgnore - null check
    const { foreignKeys }: Array<Column> = tableEntities(metaEd, namespace).get(tableName);
    expect(foreignKeys).toHaveLength(2);
    expect(foreignKeys.map(x => x.name)).toEqual([
      `FK_${parentTableName1}_${foreignTableName1}`,
      `FK_${parentTableName2}_${foreignTableName2}`,
    ]);
  });

  it('should have correct foreign key column order', () => {
    // $FlowIgnore - null check
    const { parentTableColumnNames }: Array<string> = R.last(tableEntities(metaEd, namespace).get(tableName).foreignKeys);
    expect(parentTableColumnNames).toHaveLength(2);
    expect(parentTableColumnNames).toEqual([parentTableColumnName1, parentTableColumnName2]);

    // $FlowIgnore - null check
    const { foreignTableColumnNames }: Array<string> = R.last(tableEntities(metaEd, namespace).get(tableName).foreignKeys);
    expect(foreignTableColumnNames).toHaveLength(2);
    expect(foreignTableColumnNames).toEqual([foreignTableColumnName1, foreignTableColumnName2]);
  });
});

describe('when TemplateSpecificTablePropertyEnhancer enhances table with unique indexes', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName: string = 'TableName';
  const uniqueIndexName1: string = 'UniqueIndexName1';
  const uniqueIndexName2: string = 'UniqueIndexName2';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      columns: [
        Object.assign(newColumn(), {
          name: uniqueIndexName2,
          isUniqueIndex: true,
        }),
        Object.assign(newColumn(), {
          name: 'ColumnName',
        }),
        Object.assign(newColumn(), {
          name: uniqueIndexName1,
          isUniqueIndex: true,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have correct unique index order', () => {
    // $FlowIgnore - null check
    const { uniqueIndexes }: Array<Column> = tableEntities(metaEd, namespace).get(tableName);
    expect(uniqueIndexes).toHaveLength(2);
    expect(uniqueIndexes.map(x => x.name)).toEqual([uniqueIndexName1, uniqueIndexName2]);
  });
});

describe('when TemplateSpecificTablePropertyEnhancer enhances table with primary and non primary keys', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName: string = 'TableName';
  const primaryKeyName1: string = 'PrimaryKeyName1';
  const primaryKeyName2: string = 'PrimaryKeyName2';
  const primaryKeyName3: string = 'PrimaryKeyName3';
  const columnName1: string = 'ColumnName1';
  const columnName2: string = 'ColumnName2';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      schema: namespace.namespaceName,
      columns: [
        Object.assign(newColumn(), {
          name: primaryKeyName3,
          isPartOfPrimaryKey: true,
        }),
        Object.assign(newColumn(), {
          name: columnName2,
        }),
        Object.assign(newColumn(), {
          name: primaryKeyName2,
          isPartOfPrimaryKey: true,
        }),
        Object.assign(newColumn(), {
          name: columnName1,
        }),
        Object.assign(newColumn(), {
          name: primaryKeyName1,
          isPartOfPrimaryKey: true,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have correct column order with primary keys first', () => {
    // $FlowIgnore - null check
    const { columns }: Array<Column> = tableEntities(metaEd, namespace).get(tableName);
    expect(columns).toHaveLength(5);
    expect(columns.map(x => x.name)).toEqual([primaryKeyName1, primaryKeyName2, primaryKeyName3, columnName2, columnName1]);
  });
});

describe('when TemplateSpecificTablePropertyEnhancer enhances table and columns with sql escaped description', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName: string = 'TableName';
  const expectedDescription: string = "Test ''description'' with ''quotes''";

  beforeAll(() => {
    const description: string = "Test 'description' with 'quotes'";
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      schema: namespace.namespaceName,
      description,
      columns: [
        Object.assign(newColumn(), {
          description,
        }),
        Object.assign(newColumn(), {
          description,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have correct sql escaped descriptions for table', () => {
    // $FlowIgnore - null check
    const table: Table = tableEntities(metaEd, namespace).get(tableName);
    expect(table).toBeDefined();
    expect(table.sqlEscapedDescription).toEqual(expectedDescription);
  });

  it('should have correct sql escaped descriptions for columns', () => {
    // $FlowIgnore - null check
    const { columns }: Array<Column> = tableEntities(metaEd, namespace).get(tableName);
    expect(columns).toHaveLength(2);
    expect(columns.map(x => x.sqlEscapedDescription)).toEqual([expectedDescription, expectedDescription]);
  });
});
