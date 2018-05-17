// @flow
import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment } from 'metaed-core';
import { enhance } from '../../src/diminisher/RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import type { Column } from '../../src/model/database/Column';
import type { ForeignKey } from '../../src/model/database/ForeignKey';
import type { Table } from '../../src/model/database/Table';

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentLearningObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId: string = 'SchoolId';
  const studentLearningObjective: string = 'StudentLearningObjective';

  beforeAll(() => {
    const gradingPeriod: string = 'GradingPeriod';
    const gradingPeriodSchoolId: string = gradingPeriod + schoolId;
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentLearningObjective,
      columns: [
        Object.assign(newColumn(), {
          name: gradingPeriodSchoolId,
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

    metaEd.dataStandardVersion = '2.1.0';
    enhance(metaEd);
  });

  it('should rename column', () => {
    const column: Column = R.head(tableEntities(metaEd, namespace).get(studentLearningObjective).columns);
    expect(column.name).toBe(schoolId);
  });

  it('should rename foreign key columns', () => {
    const foreignKeys: Array<ForeignKey> = tableEntities(metaEd, namespace).get(studentLearningObjective).foreignKeys;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentCompetencyObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId: string = 'SchoolId';
  const studentCompetencyObjective: string = 'StudentCompetencyObjective';

  beforeAll(() => {
    const gradingPeriod: string = 'GradingPeriod';
    const gradingPeriodSchoolId: string = gradingPeriod + schoolId;
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentCompetencyObjective,
      columns: [
        Object.assign(newColumn(), {
          name: gradingPeriodSchoolId,
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

    metaEd.dataStandardVersion = '2.1.0';
    enhance(metaEd);
  });

  it('should rename column', () => {
    const column: Column = R.head(tableEntities(metaEd, namespace).get(studentCompetencyObjective).columns);
    expect(column.name).toBe(schoolId);
  });

  it('should rename foreign key columns', () => {
    const foreignKeys: Array<ForeignKey> = tableEntities(metaEd, namespace).get(studentCompetencyObjective).foreignKeys;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentCompetencyObjectiveStudentProgramAssociation table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId: string = 'SchoolId';
  const gradingPeriodSchoolId: string = `GradingPeriod${schoolId}`;
  const studentCompetencyObjective: string = 'StudentCompetencyObjective';
  const studentCompetencyObjectiveStudentProgramAssociation: string = `${studentCompetencyObjective}StudentProgramAssociation`;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentCompetencyObjectiveStudentProgramAssociation,
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: studentCompetencyObjective,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: gradingPeriodSchoolId,
              foreignTableColumnName: gradingPeriodSchoolId,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.1.0';
    enhance(metaEd);
  });

  it('should rename foreign key columns', () => {
    const foreignKeys: Array<ForeignKey> = tableEntities(metaEd, namespace).get(
      studentCompetencyObjectiveStudentProgramAssociation,
    ).foreignKeys;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(gradingPeriodSchoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentCompetencyObjectiveStudentSectionAssociation table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId: string = 'SchoolId';
  const gradingPeriodSchoolId: string = `GradingPeriod${schoolId}`;
  const studentCompetencyObjective: string = 'StudentCompetencyObjective';
  const studentCompetencyObjectiveStudentSectionAssociation: string = `${studentCompetencyObjective}StudentSectionAssociation`;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentCompetencyObjectiveStudentSectionAssociation,
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: studentCompetencyObjective,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: gradingPeriodSchoolId,
              foreignTableColumnName: gradingPeriodSchoolId,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.1.0';
    enhance(metaEd);
  });

  it('should rename foreign key columns', () => {
    const foreignKeys: Array<ForeignKey> = tableEntities(metaEd, namespace).get(
      studentCompetencyObjectiveStudentSectionAssociation,
    ).foreignKeys;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(gradingPeriodSchoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentLearningObjectiveStudentProgramAssociation table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId: string = 'SchoolId';
  const gradingPeriodSchoolId: string = `GradingPeriod${schoolId}`;
  const studentLearningObjective: string = 'StudentLearningObjective';
  const studentLearningObjectiveStudentStudentProgramAssociation: string = `${studentLearningObjective}StudentProgramAssociation`;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentLearningObjectiveStudentStudentProgramAssociation,
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: studentLearningObjective,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: gradingPeriodSchoolId,
              foreignTableColumnName: gradingPeriodSchoolId,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.1.0';
    enhance(metaEd);
  });

  it('should rename foreign key columns', () => {
    const foreignKeys: Array<ForeignKey> = tableEntities(metaEd, namespace).get(
      studentLearningObjectiveStudentStudentProgramAssociation,
    ).foreignKeys;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(gradingPeriodSchoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentLearningObjectiveStudentSectionAssociation table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId: string = 'SchoolId';
  const gradingPeriodSchoolId: string = `GradingPeriod${schoolId}`;
  const studentLearningObjective: string = 'StudentLearningObjective';
  const studentLearningObjectiveStudentStudentSectionAssociation: string = `${studentLearningObjective}StudentSectionAssociation`;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentLearningObjectiveStudentStudentSectionAssociation,
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: studentLearningObjective,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: gradingPeriodSchoolId,
              foreignTableColumnName: gradingPeriodSchoolId,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.1.0';
    enhance(metaEd);
  });

  it('should rename foreign key columns', () => {
    const foreignKeys: Array<ForeignKey> = tableEntities(metaEd, namespace).get(
      studentLearningObjectiveStudentStudentSectionAssociation,
    ).foreignKeys;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(gradingPeriodSchoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});
