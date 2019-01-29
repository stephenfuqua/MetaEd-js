import R from 'ramda';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_0_x';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Column } from '../../src/model/database/Column';
import { ForeignKey } from '../../src/model/database/ForeignKey';
import { Table } from '../../src/model/database/Table';

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_0_x diminishes StudentCompetencyObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const studentCompetencyObjective = 'StudentCompetencyObjective';
  const schoolId = 'SchoolId';
  const gradingPeriod = 'GradingPeriod';
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
    const { columns } = tableEntities(metaEd, namespace).get(studentCompetencyObjective) as Table;
    expect(columns).toHaveLength(1);
    expect(R.head(columns).name).not.toBe(gradingPeriodSchoolId);
  });

  it('should rename foreign key columns', () => {
    const foreignKey: ForeignKey = R.head(
      (tableEntities(metaEd, namespace).get(studentCompetencyObjective) as Table).foreignKeys,
    );
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(schoolId);
  });

  it('should make SchoolId column a non-nullable primary key', () => {
    const column: Column = R.head((tableEntities(metaEd, namespace).get(studentCompetencyObjective) as Table).columns);
    expect(column.name).toBe(schoolId);
    expect(column.isNullable).toBe(false);
    expect(column.isPartOfPrimaryKey).toBe(true);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_0_x diminishes StudentLearningObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const studentLearningObjective = 'StudentLearningObjective';
  const schoolId = 'SchoolId';
  const gradingPeriod = 'GradingPeriod';
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
    const { columns } = tableEntities(metaEd, namespace).get(studentLearningObjective) as Table;
    expect(columns).toHaveLength(1);
    expect(R.head(columns).name).not.toBe(gradingPeriodSchoolId);
  });

  it('should rename foreign key columns', () => {
    const foreignKey = R.head((tableEntities(metaEd, namespace).get(studentLearningObjective) as Table).foreignKeys);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(schoolId);
  });

  it('should make SchoolId column a non-nullable primary key', () => {
    const column: Column = R.head((tableEntities(metaEd, namespace).get(studentLearningObjective) as Table).columns);
    expect(column.name).toBe(schoolId);
    expect(column.isNullable).toBe(false);
    expect(column.isPartOfPrimaryKey).toBe(true);
  });
});
