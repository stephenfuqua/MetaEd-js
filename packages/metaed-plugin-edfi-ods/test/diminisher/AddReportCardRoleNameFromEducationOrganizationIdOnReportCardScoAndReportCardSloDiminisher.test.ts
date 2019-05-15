import R from 'ramda';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/AddReportCardRoleNameFromEducationOrganizationIdOnReportCardScoAndReportCardSloDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { Table } from '../../src/model/database/Table';

describe('when AddReportCardRoleNameFromEducationOrganizationIdOnReportCardScoAndReportCardSloDiminisher diminishes ReportCardStudentCompetencyObjective table', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const reportCardStudentCompetencyObjective = 'ReportCardStudentCompetencyObjective';
  const educationOrganizationId = 'EducationOrganizationId';
  const reportCard = 'ReportCard';
  const reportCardEducationOrganizationId = 'ReportCardEducationOrganizationId';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: reportCardStudentCompetencyObjective,
      nameComponents: [reportCardStudentCompetencyObjective],
      columns: [
        Object.assign(newColumn(), {
          name: educationOrganizationId,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: reportCard,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: educationOrganizationId,
              foreignTableColumnName: educationOrganizationId,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename EducationOrganizationId column to ReportCardEducationOrganizationId', (): void => {
    const {
      columns: [column],
    } = tableEntities(metaEd, namespace).get(reportCardStudentCompetencyObjective) as Table;
    expect(column.name).toBe(reportCardEducationOrganizationId);
  });

  it('should have correct foreign key relationship', (): void => {
    const {
      foreignKeys: [foreignKey],
    } = tableEntities(metaEd, namespace).get(reportCardStudentCompetencyObjective) as Table;
    expect(foreignKey.foreignTableName).toBe(reportCard);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(reportCardEducationOrganizationId);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(educationOrganizationId);
  });
});

describe('when AddReportCardRoleNameFromEducationOrganizationIdOnReportCardScoAndReportCardSloDiminisher diminishes ReportCardStudentLearningObjective table', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const reportCardStudentLearningObjective = 'ReportCardStudentLearningObjective';
  const educationOrganizationId = 'EducationOrganizationId';
  const reportCard = 'ReportCard';
  const reportCardEducationOrganizationId = 'ReportCardEducationOrganizationId';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: reportCardStudentLearningObjective,
      nameComponents: [reportCardStudentLearningObjective],
      columns: [
        Object.assign(newColumn(), {
          name: educationOrganizationId,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: reportCard,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: educationOrganizationId,
              foreignTableColumnName: educationOrganizationId,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename EducationOrganizationId column to ReportCardEducationOrganizationId', (): void => {
    const {
      columns: [column],
    } = tableEntities(metaEd, namespace).get(reportCardStudentLearningObjective) as Table;
    expect(column.name).toBe(reportCardEducationOrganizationId);
  });

  it('should have correct foreign key relationship', (): void => {
    const {
      foreignKeys: [foreignKey],
    } = tableEntities(metaEd, namespace).get(reportCardStudentLearningObjective) as Table;
    expect(foreignKey.foreignTableName).toBe(reportCard);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(reportCardEducationOrganizationId);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(educationOrganizationId);
  });
});
