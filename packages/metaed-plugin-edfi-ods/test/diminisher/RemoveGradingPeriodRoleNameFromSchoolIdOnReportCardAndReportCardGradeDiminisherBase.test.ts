import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisherBase';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Column } from '../../src/model/database/Column';
import { ForeignKey } from '../../src/model/database/ForeignKey';
import { Table } from '../../src/model/database/Table';

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisherBase diminishes ReportCard table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const reportCard = 'ReportCard';
  const schoolId = 'SchoolId';

  beforeAll(() => {
    const gradingPeriod = 'GradingPeriod';
    const gradingPeriodSchoolId: string = gradingPeriod + schoolId;
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: reportCard,
      nameComponents: [reportCard],
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

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename column', () => {
    const column: Column = R.head((tableEntities(metaEd, namespace).get(reportCard) as Table).columns);
    expect(column.name).toBe(schoolId);
  });

  it('should rename foreign key columns', () => {
    const foreignKey: ForeignKey = R.head((tableEntities(metaEd, namespace).get(reportCard) as Table).foreignKeys);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisherBase diminishes ReportCardGrade table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const grade = 'Grade';
  const reportCard = 'ReportCard';
  const schoolId = 'SchoolId';
  const reportCardGrade: string = reportCard + grade;

  beforeAll(() => {
    const gradingPeriodSchoolId: string = `GradingPeriod${schoolId}`;
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: reportCardGrade,
      nameComponents: [reportCardGrade],
      columns: [
        Object.assign(newColumn(), {
          name: gradingPeriodSchoolId,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: reportCard,
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

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should remove column', () => {
    const column: Column = R.head((tableEntities(metaEd, namespace).get(reportCardGrade) as Table).columns);
    expect(column).toBeUndefined();
  });

  it('should rename foreign key columns', () => {
    const foreignKey: ForeignKey = R.head((tableEntities(metaEd, namespace).get(reportCardGrade) as Table).foreignKeys);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisherBase diminishes ReportCardStudentCompetencyObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const reportCard = 'ReportCard';
  const schoolId = 'SchoolId';
  const studentCompetencyObjective = 'StudentCompetencyObjective';
  const reportCardStudentCompetencyObjective: string = reportCard + studentCompetencyObjective;

  beforeAll(() => {
    const gradingPeriodSchoolId: string = `GradingPeriod${schoolId}`;
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: reportCardStudentCompetencyObjective,
      nameComponents: [reportCardStudentCompetencyObjective],
      columns: [
        Object.assign(newColumn(), {
          name: gradingPeriodSchoolId,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: reportCard,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: gradingPeriodSchoolId,
              foreignTableColumnName: gradingPeriodSchoolId,
            }),
          ],
        }),
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

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename column', () => {
    const column: Column = R.head(
      (tableEntities(metaEd, namespace).get(reportCardStudentCompetencyObjective) as Table).columns,
    );
    expect(column.name).toBe(schoolId);
  });

  it('should rename foreign key columns', () => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(reportCardStudentCompetencyObjective) as Table;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
    expect(R.head(R.last(foreignKeys).columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(R.last(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisherBase diminishes ReportCardStudentLearningObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const reportCard = 'ReportCard';
  const schoolId = 'SchoolId';
  const studentLearningObjective = 'StudentLearningObjective';
  const reportCardStudentLearningObjective: string = reportCard + studentLearningObjective;

  beforeAll(() => {
    const gradingPeriodSchoolId: string = `GradingPeriod${schoolId}`;
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: reportCardStudentLearningObjective,
      nameComponents: [reportCardStudentLearningObjective],
      columns: [
        Object.assign(newColumn(), {
          name: gradingPeriodSchoolId,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: reportCard,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: gradingPeriodSchoolId,
              foreignTableColumnName: gradingPeriodSchoolId,
            }),
          ],
        }),
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

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename column', () => {
    const column: Column = R.head(
      (tableEntities(metaEd, namespace).get(reportCardStudentLearningObjective) as Table).columns,
    );
    expect(column.name).toBe(schoolId);
  });

  it('should rename foreign key columns', () => {
    const { foreignKeys } = tableEntities(metaEd, namespace).get(reportCardStudentLearningObjective) as Table;
    expect(R.head(R.head(foreignKeys).columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(R.head(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
    expect(R.head(R.last(foreignKeys).columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(R.last(foreignKeys).columnNames).foreignTableColumnName).toBe(schoolId);
  });
});

describe('when RemoveGradingPeriodRoleNameFromSchoolIdOnReportCardAndReportCardGradeDiminisherBase diminishes StudentAcademicRecordReportCard table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const reportCard = 'ReportCard';
  const schoolId = 'SchoolId';
  const studentAcademicRecord = 'StudentAcademicRecord';
  const studentAcademicRecordReportCard: string = studentAcademicRecord + reportCard;

  beforeAll(() => {
    const gradingPeriodSchoolId: string = `GradingPeriod${schoolId}`;
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentAcademicRecordReportCard,
      nameComponents: [studentAcademicRecordReportCard],
      columns: [
        Object.assign(newColumn(), {
          name: gradingPeriodSchoolId,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: reportCard,
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

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename column', () => {
    const column: Column = R.head((tableEntities(metaEd, namespace).get(studentAcademicRecordReportCard) as Table).columns);
    expect(column.name).toBe(schoolId);
  });

  it('should rename foreign key columns', () => {
    const foreignKey: ForeignKey = R.head(
      (tableEntities(metaEd, namespace).get(studentAcademicRecordReportCard) as Table).foreignKeys,
    );
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(schoolId);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(schoolId);
  });
});
