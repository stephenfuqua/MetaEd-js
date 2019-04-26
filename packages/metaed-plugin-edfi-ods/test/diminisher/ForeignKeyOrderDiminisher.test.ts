import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/ForeignKeyOrderDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Column } from '../../src/model/database/Column';
import { ForeignKey } from '../../src/model/database/ForeignKey';
import { Table } from '../../src/model/database/Table';

describe('when ForeignKeyOrderDiminisher diminishes matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const namespaceName = 'EdFi';
  const schemaName = namespaceName.toLowerCase();
  const parentTableName = 'ParentTableName';
  const gradebookEntryLearningObjective = 'GradebookEntryLearningObjective';
  const primaryKeyOrder: Array<string> = [
    'SchoolId',
    'ClassPeriodName',
    'ClassroomIdentificationCode',
    'GradebookEntryTitle',
    'DateAssigned',
    'Objective',
    'AcademicSubjectDescriptorId',
    'ObjectiveGradeLevelDescriptorId',
    'SchoolYear',
    'LocalCourseCode',
    'TermDescriptorId',
    'UniqueSectionCode',
    'SequenceOfCourse',
  ];
  const primaryKeyNames: Array<string> = [
    'SequenceOfCourse',
    'SchoolId',
    'UniqueSectionCode',
    'ClassPeriodName',
    'TermDescriptorId',
    'ClassroomIdentificationCode',
    'LocalCourseCode',
    'GradebookEntryTitle',
    'SchoolYear',
    'DateAssigned',
    'ObjectiveGradeLevelDescriptorId',
    'Objective',
    'AcademicSubjectDescriptorId',
  ];

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const foreignTable: Table = Object.assign(newTable(), {
      name: gradebookEntryLearningObjective,
      nameComponents: [gradebookEntryLearningObjective],
      primaryKeys: primaryKeyOrder.map((name: string) =>
        Object.assign(newColumn(), {
          name,
          isPartOfPrimaryKey: true,
        }),
      ),
    });
    tableEntities(metaEd, namespace).set(foreignTable.name, foreignTable);

    const parentTable: Table = Object.assign(newTable(), {
      name: parentTableName,
      nameComponents: [parentTableName],
      columns: primaryKeyNames.map((name: string) =>
        Object.assign(newColumn(), {
          name,
        }),
      ),
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableSchema: schemaName,
          foreignTableName: foreignTable.name,
          columnNames: primaryKeyNames.map((name: string) =>
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: name,
              foreignTableColumnName: name,
            }),
          ),
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(parentTable.name, parentTable);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have correct foreign key order', () => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(parentTableName) as Table;
    expect(foreignKeys).toBeDefined();
    expect(R.chain((fk: ForeignKey) => fk.foreignTableColumnNames)(foreignKeys)).toEqual(primaryKeyOrder);
  });

  it('should have order parity with foreign table primary keys', () => {
    const primaryKeyNamesOnForeignTable: Array<string> = (tableEntities(metaEd, namespace).get(
      gradebookEntryLearningObjective,
    ) as Table).primaryKeys.map((pk: Column) => pk.name);
    const foreignKeyNames: Array<string> = R.chain((fk: ForeignKey) => fk.foreignTableColumnNames)(
      (tableEntities(metaEd, namespace).get(parentTableName) as Table).foreignKeys,
    );
    expect(primaryKeyNamesOnForeignTable).toEqual(foreignKeyNames);
  });
});

describe('when ForeignKeyOrderDiminisher diminishes non matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const namespaceName = 'EdFi';
  const schemaName = namespaceName.toLowerCase();
  const parentTableName = 'ParentTableName';
  const foreignTableName = 'ForeignTableName';
  const primaryKeyNames: Array<string> = [
    'PrimaryKeyNameF',
    'PrimaryKeyNameA',
    'PrimaryKeyNameC',
    'PrimaryKeyNameE',
    'PrimaryKeyNameD',
    'PrimaryKeyNameB',
    'PrimaryKeyNameJ',
    'PrimaryKeyNameH',
    'PrimaryKeyNameG',
    'PrimaryKeyNameI',
  ];

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const foreignTable: Table = Object.assign(newTable(), {
      name: foreignTableName,
      nameComponents: [foreignTableName],
      primaryKeys: primaryKeyNames.map((name: string) =>
        Object.assign(newColumn(), {
          name,
          isPartOfPrimaryKey: true,
        }),
      ),
    });
    tableEntities(metaEd, namespace).set(foreignTable.name, foreignTable);

    const parentTable: Table = Object.assign(newTable(), {
      name: parentTableName,
      nameComponents: [parentTableName],
      columns: primaryKeyNames.map((name: string) =>
        Object.assign(newColumn(), {
          name,
        }),
      ),
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableSchema: schemaName,
          foreignTableName: foreignTable.name,
          columnNames: primaryKeyNames.map((name: string) =>
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: name,
              foreignTableColumnName: name,
            }),
          ),
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(parentTable.name, parentTable);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have correct foreign key order', () => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(parentTableName) as Table;
    expect(foreignKeys).toBeDefined();
    expect(R.chain((fk: ForeignKey) => fk.foreignTableColumnNames)(foreignKeys)).toEqual(primaryKeyNames);
  });

  it('should have order parity with foreign table primary keys', () => {
    const primaryKeyNamesOnForeignTable = (tableEntities(metaEd, namespace).get(foreignTableName) as Table).primaryKeys.map(
      (pk: Column) => pk.name,
    );
    const foreignKeyNames = R.chain((fk: ForeignKey) => fk.foreignTableColumnNames)(
      (tableEntities(metaEd, namespace).get(parentTableName) as Table).foreignKeys,
    );
    expect(primaryKeyNamesOnForeignTable).toEqual(foreignKeyNames);
  });
});
