import R from 'ramda';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/ForeignKeyReverseIndexEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Column } from '../../src/model/database/Column';
import { ForeignKey } from '../../src/model/database/ForeignKey';
import { Table } from '../../src/model/database/Table';

describe('when ForeignKeyReverseIndexEnhancer enhances table with foreign key matching primary key columns', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName = 'TableName';

  beforeAll(() => {
    const table: Table = Object.assign(newTable(), {
      name: tableName,
      nameComponents: [tableName],
      schema: 'edfi',
    });
    const primaryKey: Column = Object.assign(newColumn(), {
      name: 'PrimaryKeyName',
      isPartOfPrimaryKey: true,
    });
    table.columns.push(primaryKey);
    const foreignKey: ForeignKey = Object.assign(newForeignKey(), {
      withReverseForeignKeyIndex: false,
      columnNames: [
        Object.assign(newColumnNamePair(), {
          parentTableColumnName: primaryKey.name,
          foreignTableColumnName: primaryKey.name,
        }),
      ],
    });
    table.foreignKeys.push(foreignKey);

    initializeEdFiOdsEntityRepository(metaEd);
    tableEntities(metaEd, namespace).set(table.name, table);
    enhance(metaEd);
  });

  it('should have foreign key with reverse foreign key index set to false', () => {
    const foreignKey = R.head((tableEntities(metaEd, namespace).get(tableName) as Table).foreignKeys);
    expect(foreignKey.withReverseForeignKeyIndex).toBe(false);
  });
});

describe('when ForeignKeyReverseIndexEnhancer enhances table with foreign key not matching primary key columns', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName = 'TableName';

  beforeAll(() => {
    const table: Table = Object.assign(newTable(), {
      name: tableName,
      nameComponents: [tableName],
    });
    const primaryKey: Column = Object.assign(newColumn(), {
      isPartOfPrimaryKey: true,
    });
    table.columns.push(primaryKey);
    const column: Column = Object.assign(newColumn(), {
      name: 'columnName',
    });
    table.columns.push(column);
    const foreignKey: ForeignKey = Object.assign(newForeignKey(), {
      withReverseForeignKeyIndex: false,
      columnNames: [
        Object.assign(newColumnNamePair(), {
          parentTableColumnName: column.name,
          foreignTableColumnName: column.name,
        }),
      ],
    });
    table.foreignKeys.push(foreignKey);

    initializeEdFiOdsEntityRepository(metaEd);
    tableEntities(metaEd, namespace).set(table.name, table);
    enhance(metaEd);
  });

  it('should have foreign key with reverse foreign key index set to true', () => {
    const foreignKey = R.head((tableEntities(metaEd, namespace).get(tableName) as Table).foreignKeys);
    expect(foreignKey.withReverseForeignKeyIndex).toBe(true);
  });
});

describe('when ForeignKeyReverseIndexEnhancer enhances table with multi column foreign key matching primary key columns', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName = 'TableName';

  beforeAll(() => {
    const table: Table = Object.assign(newTable(), {
      name: tableName,
      nameComponents: [tableName],
    });
    const primaryKey1: Column = Object.assign(newColumn(), {
      name: 'primaryKeyName1',
      isPartOfPrimaryKey: true,
    });
    table.columns.push(primaryKey1);
    const primaryKey2: Column = Object.assign(newColumn(), {
      name: 'primaryKeyName2',
      isPartOfPrimaryKey: true,
    });
    table.columns.push(primaryKey2);
    const foreignKey: ForeignKey = Object.assign(newForeignKey(), {
      withReverseForeignKeyIndex: false,
      columnNames: [
        Object.assign(newColumnNamePair(), {
          parentTableColumnName: primaryKey1.name,
          foreignTableColumnName: primaryKey1.name,
        }),
        Object.assign(newColumnNamePair(), {
          parentTableColumnName: primaryKey2.name,
          foreignTableColumnName: primaryKey2.name,
        }),
      ],
    });
    table.foreignKeys.push(foreignKey);

    initializeEdFiOdsEntityRepository(metaEd);
    tableEntities(metaEd, namespace).set(table.name, table);
    enhance(metaEd);
  });

  it('should have foreign key with reverse foreign key index set to false', () => {
    const foreignKey = R.head((tableEntities(metaEd, namespace).get(tableName) as Table).foreignKeys);
    expect(foreignKey.withReverseForeignKeyIndex).toBe(false);
  });
});

describe('when ForeignKeyReverseIndexEnhancer enhances table with foreign key subset of primary key columns', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName = 'TableName';

  beforeAll(() => {
    const table: Table = Object.assign(newTable(), {
      name: tableName,
      nameComponents: [tableName],
    });
    const primaryKey1: Column = Object.assign(newColumn(), {
      name: 'primaryKeyName1',
      isPartOfPrimaryKey: true,
    });
    table.columns.push(primaryKey1);
    const primaryKey2: Column = Object.assign(newColumn(), {
      name: 'primaryKeyName2',
      isPartOfPrimaryKey: true,
    });
    table.columns.push(primaryKey2);
    const foreignKey: ForeignKey = Object.assign(newForeignKey(), {
      withReverseForeignKeyIndex: false,
      columnNames: [
        Object.assign(newColumnNamePair(), {
          parentTableColumnName: primaryKey1.name,
          foreignTableColumnName: primaryKey1.name,
        }),
      ],
    });
    table.foreignKeys.push(foreignKey);

    initializeEdFiOdsEntityRepository(metaEd);
    tableEntities(metaEd, namespace).set(table.name, table);
    enhance(metaEd);
  });

  it('should have foreign key with reverse foreign key index set to true', () => {
    const foreignKey = R.head((tableEntities(metaEd, namespace).get(tableName) as Table).foreignKeys);
    expect(foreignKey.withReverseForeignKeyIndex).toBe(true);
  });
});

describe('when ForeignKeyReverseIndexEnhancer enhances table with foreign key superset of primary key columns', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName = 'TableName';

  beforeAll(() => {
    const table: Table = Object.assign(newTable(), {
      name: tableName,
      nameComponents: [tableName],
    });
    const primaryKey: Column = Object.assign(newColumn(), {
      name: 'primaryKeyName',
      isPartOfPrimaryKey: true,
    });
    table.columns.push(primaryKey);
    const column: Column = Object.assign(newColumn(), {
      name: 'columnName',
    });
    table.columns.push(column);
    const foreignKey: ForeignKey = Object.assign(newForeignKey(), {
      withReverseForeignKeyIndex: false,
      columnNames: [
        Object.assign(newColumnNamePair(), {
          parentTableColumnName: primaryKey.name,
          foreignTableColumnName: primaryKey.name,
        }),
        Object.assign(newColumnNamePair(), {
          parentTableColumnName: column.name,
          foreignTableColumnName: column.name,
        }),
      ],
    });
    table.foreignKeys.push(foreignKey);

    initializeEdFiOdsEntityRepository(metaEd);
    tableEntities(metaEd, namespace).set(table.name, table);
    enhance(metaEd);
  });

  it('should have foreign key with reverse foreign key index set to true', () => {
    const foreignKey = R.head((tableEntities(metaEd, namespace).get(tableName) as Table).foreignKeys);
    expect(foreignKey.withReverseForeignKeyIndex).toBe(true);
  });
});
