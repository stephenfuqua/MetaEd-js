// @flow
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/PrimaryKeyOrderDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import type { Column } from '../../src/model/database/Column';
import type { Table } from '../../src/model/database/Table';

describe('when PrimaryKeyOrderDiminisher diminishes matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const gradebookEntryLearningObjective: string = 'GradebookEntryLearningObjective';
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
  const expectedPrimaryKeyOrder: Array<string> = [
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

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: gradebookEntryLearningObjective,
      columns: primaryKeyNames.map((name: string) =>
        Object.assign(newColumn(), {
          name,
          isPartOfPrimaryKey: true,
        }),
      ),
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have correct primary key order', () => {
    // $FlowIgnore - null check
    const primaryKeys: Array<Column> = tableEntities(metaEd, namespace).get(gradebookEntryLearningObjective).primaryKeys;
    expect(primaryKeys.map((pk: Column) => pk.name)).toEqual(expectedPrimaryKeyOrder);
  });
});

describe('when PrimaryKeyOrderDiminisher diminishes matching table with extraneous primary keys', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const gradebookEntryLearningObjective: string = 'GradebookEntryLearningObjective';
  const primaryKeyNames: Array<string> = [
    'PrimaryKeyNameC',
    'ClassroomIdentificationCode',
    'TermDescriptorId',
    'GradebookEntryTitle',
    'PrimaryKeyNameF',
    'PrimaryKeyNameA',
    'PrimaryKeyNameG',
    'Objective',
    'PrimaryKeyNameH',
    'AcademicSubjectDescriptorId',
    'PrimaryKeyNameD',
    'LocalCourseCode',
    'ClassPeriodName',
    'SchoolId',
    'SequenceOfCourse',
    'SchoolYear',
    'PrimaryKeyNameB',
    'PrimaryKeyNameJ',
    'ObjectiveGradeLevelDescriptorId',
    'PrimaryKeyNameE',
    'DateAssigned',
    'UniqueSectionCode',
    'PrimaryKeyNameI',
  ];
  const expectedPrimaryKeyOrder: Array<string> = [
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
    'PrimaryKeyNameA',
    'PrimaryKeyNameB',
    'PrimaryKeyNameC',
    'PrimaryKeyNameD',
    'PrimaryKeyNameE',
    'PrimaryKeyNameF',
    'PrimaryKeyNameG',
    'PrimaryKeyNameH',
    'PrimaryKeyNameI',
    'PrimaryKeyNameJ',
  ];

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: gradebookEntryLearningObjective,
      columns: primaryKeyNames.map((name: string) =>
        Object.assign(newColumn(), {
          name,
          isPartOfPrimaryKey: true,
        }),
      ),
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have correct primary key order', () => {
    // $FlowIgnore - null check
    const primaryKeys: Array<Column> = tableEntities(metaEd, namespace).get(gradebookEntryLearningObjective).primaryKeys;
    expect(primaryKeys.map((pk: Column) => pk.name)).toEqual(expectedPrimaryKeyOrder);
  });
});

describe('when PrimaryKeyOrderDiminisher diminishes non matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const TableName: string = 'TableName';
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

    const table: Table = Object.assign(newTable(), {
      name: TableName,
      columns: primaryKeyNames.map((name: string) =>
        Object.assign(newColumn(), {
          name,
          isPartOfPrimaryKey: true,
        }),
      ),
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have correct primary key order', () => {
    // $FlowIgnore - null check
    const primaryKeys: Array<Column> = tableEntities(metaEd, namespace).get(TableName).primaryKeys;
    expect(primaryKeys).toEqual([]);
  });
});
