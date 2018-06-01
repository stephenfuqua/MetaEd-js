// @flow
import R from 'ramda';
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_0_x';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import type { Column } from '../../src/model/database/Column';
import type { ForeignKey } from '../../src/model/database/ForeignKey';
import type { Table } from '../../src/model/database/Table';

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_0_x diminishes StudentCompetencyObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const studentCompetencyObjective: string = 'StudentCompetencyObjective';
  const schoolId: string = 'SchoolId';
  const gradingPeriod: string = 'GradingPeriod';
  const gradingPeriodSchoolId: string = gradingPeriod + schoolId;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentCompetencyObjective,
      columns: [
        Object.assign(newColumn(), {
          name: gradingPeriodSchoolId,
        }),
        Object.assign(newColumn(), {
          name: schoolId,
          isNullable: true,
          isPartOfPrimaryKey: false,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: gradingPeriod,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: gradingPeriodSchoolId,
              foreignTableColumnName: schoolId,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should remove GradingPeriodSchoolId column', () => {
    // $FlowIgnore - null check
    const { columns }: Array<Column> = tableEntities(metaEd, namespace).get(studentCompetencyObjective);
    expect(columns).toHaveLength(1);
    expect(R.head(columns).name).not.toBe(gradingPeriodSchoolId);
  });

  it('should rename foreign key columns', () => {
    // $FlowIgnore - null check
    const foreignKey: ForeignKey = R.head(tableEntities(metaEd, namespace).get(studentCompetencyObjective).foreignKeys);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(schoolId);
  });

  it('should make SchoolId column a non-nullable primary key', () => {
    // $FlowIgnore - null check
    const column: Column = R.head(tableEntities(metaEd, namespace).get(studentCompetencyObjective).columns);
    expect(column.name).toBe(schoolId);
    expect(column.isNullable).toBe(false);
    expect(column.isPartOfPrimaryKey).toBe(true);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_0_x diminishes StudentLearningObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const studentLearningObjective: string = 'StudentLearningObjective';
  const schoolId: string = 'SchoolId';
  const gradingPeriod: string = 'GradingPeriod';
  const gradingPeriodSchoolId: string = gradingPeriod + schoolId;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentLearningObjective,
      columns: [
        Object.assign(newColumn(), {
          name: gradingPeriodSchoolId,
        }),
        Object.assign(newColumn(), {
          name: schoolId,
          isNullable: true,
          isPartOfPrimaryKey: false,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: gradingPeriod,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: gradingPeriodSchoolId,
              foreignTableColumnName: schoolId,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should remove GradingPeriodSchoolId column', () => {
    // $FlowIgnore - null check
    const { columns }: Array<Column> = tableEntities(metaEd, namespace).get(studentLearningObjective);
    expect(columns).toHaveLength(1);
    expect(R.head(columns).name).not.toBe(gradingPeriodSchoolId);
  });

  it('should rename foreign key columns', () => {
    // $FlowIgnore - null check
    const foreignKey: ?ForeignKey = R.head(tableEntities(metaEd, namespace).get(studentLearningObjective).foreignKeys);
    // $FlowIgnore - null check
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(schoolId);
    // $FlowIgnore - null check
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(schoolId);
  });

  it('should make SchoolId column a non-nullable primary key', () => {
    // $FlowIgnore - null check
    const column: Column = R.head(tableEntities(metaEd, namespace).get(studentLearningObjective).columns);
    expect(column.name).toBe(schoolId);
    expect(column.isNullable).toBe(false);
    expect(column.isPartOfPrimaryKey).toBe(true);
  });
});
