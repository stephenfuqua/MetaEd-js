import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Column } from '../../src/model/database/Column';
import { Table } from '../../src/model/database/Table';

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentLearningObjective table', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId = 'SchoolId';
  const studentLearningObjective = 'StudentLearningObjective';

  beforeAll(() => {
    const gradingPeriod = 'GradingPeriod';
    const gradingPeriodSchoolId: string = gradingPeriod + schoolId;
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentLearningObjective,
      nameComponents: [studentLearningObjective],
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

  it('should rename column', (): void => {
    const column: Column = R.head((tableEntities(metaEd, namespace).get(studentLearningObjective) as Table).columns);
    expect(column.name).toBe(schoolId);
  });

  it('should rename foreign key columns', (): void => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(studentLearningObjective) as Table;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentCompetencyObjective table', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId = 'SchoolId';
  const studentCompetencyObjective = 'StudentCompetencyObjective';

  beforeAll(() => {
    const gradingPeriod = 'GradingPeriod';
    const gradingPeriodSchoolId: string = gradingPeriod + schoolId;
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentCompetencyObjective,
      nameComponents: [studentCompetencyObjective],
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

  it('should rename column', (): void => {
    const column: Column = R.head((tableEntities(metaEd, namespace).get(studentCompetencyObjective) as Table).columns);
    expect(column.name).toBe(schoolId);
  });

  it('should rename foreign key columns', (): void => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(studentCompetencyObjective) as Table;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentCompetencyObjectiveStudentProgramAssociation table', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId = 'SchoolId';
  const gradingPeriodSchoolId = `GradingPeriod${schoolId}`;
  const studentCompetencyObjective = 'StudentCompetencyObjective';
  const studentCompetencyObjectiveStudentProgramAssociation = `${studentCompetencyObjective}StudentProgramAssociation`;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentCompetencyObjectiveStudentProgramAssociation,
      nameComponents: [studentCompetencyObjectiveStudentProgramAssociation],
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

  it('should rename foreign key columns', (): void => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(
      studentCompetencyObjectiveStudentProgramAssociation,
    ) as Table;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(gradingPeriodSchoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentCompetencyObjectiveStudentSectionAssociation table', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId = 'SchoolId';
  const gradingPeriodSchoolId = `GradingPeriod${schoolId}`;
  const studentCompetencyObjective = 'StudentCompetencyObjective';
  const studentCompetencyObjectiveStudentSectionAssociation = `${studentCompetencyObjective}StudentSectionAssociation`;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentCompetencyObjectiveStudentSectionAssociation,
      nameComponents: [studentCompetencyObjectiveStudentSectionAssociation],
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

  it('should rename foreign key columns', (): void => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(
      studentCompetencyObjectiveStudentSectionAssociation,
    ) as Table;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(gradingPeriodSchoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentLearningObjectiveStudentProgramAssociation table', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId = 'SchoolId';
  const gradingPeriodSchoolId = `GradingPeriod${schoolId}`;
  const studentLearningObjective = 'StudentLearningObjective';
  const studentLearningObjectiveStudentStudentProgramAssociation = `${studentLearningObjective}StudentProgramAssociation`;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentLearningObjectiveStudentStudentProgramAssociation,
      nameComponents: [studentLearningObjectiveStudentStudentProgramAssociation],
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

  it('should rename foreign key columns', (): void => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(
      studentLearningObjectiveStudentStudentProgramAssociation,
    ) as Table;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(gradingPeriodSchoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisher2_1_x diminishes StudentLearningObjectiveStudentSectionAssociation table', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const schoolId = 'SchoolId';
  const gradingPeriodSchoolId = `GradingPeriod${schoolId}`;
  const studentLearningObjective = 'StudentLearningObjective';
  const studentLearningObjectiveStudentStudentSectionAssociation = `${studentLearningObjective}StudentSectionAssociation`;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentLearningObjectiveStudentStudentSectionAssociation,
      nameComponents: [studentLearningObjectiveStudentStudentSectionAssociation],
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

  it('should rename foreign key columns', (): void => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(
      studentLearningObjectiveStudentStudentSectionAssociation,
    ) as Table;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(gradingPeriodSchoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});
