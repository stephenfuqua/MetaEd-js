// @flow
import R from 'ramda';
import type { MetaEdEnvironment } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/AddReportCardRoleNameFromEducationOrganizationIdOnReportCardScoAndReportCardSloDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import type { Column } from '../../src/model/database/Column';
import type { ForeignKey } from '../../src/model/database/ForeignKey';
import type { Table } from '../../src/model/database/Table';

describe('when AddReportCardRoleNameFromEducationOrganizationIdOnReportCardScoAndReportCardSloDiminisher diminishes ReportCardStudentCompetencyObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const reportCardStudentCompetencyObjective: string = 'ReportCardStudentCompetencyObjective';
  const educationOrganizationId: string = 'EducationOrganizationId';
  const reportCard: string = 'ReportCard';
  const reportCardEducationOrganizationId: string = 'ReportCardEducationOrganizationId';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: reportCardStudentCompetencyObjective,
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

  it('should rename EducationOrganizationId column to ReportCardEducationOrganizationId', () => {
    const column: Column = R.head(tableEntities(metaEd, namespace).get(reportCardStudentCompetencyObjective).columns);
    expect(column.name).toBe(reportCardEducationOrganizationId);
  });

  it('should have correct foreign key relationship', () => {
    const foreignKey: ForeignKey = R.head(
      tableEntities(metaEd, namespace).get(reportCardStudentCompetencyObjective).foreignKeys,
    );
    expect(foreignKey.foreignTableName).toBe(reportCard);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(reportCardEducationOrganizationId);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(educationOrganizationId);
  });
});

describe('when AddReportCardRoleNameFromEducationOrganizationIdOnReportCardScoAndReportCardSloDiminisher diminishes ReportCardStudentLearningObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const reportCardStudentLearningObjective: string = 'ReportCardStudentLearningObjective';
  const educationOrganizationId: string = 'EducationOrganizationId';
  const reportCard: string = 'ReportCard';
  const reportCardEducationOrganizationId: string = 'ReportCardEducationOrganizationId';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: reportCardStudentLearningObjective,
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

  it('should rename EducationOrganizationId column to ReportCardEducationOrganizationId', () => {
    const column: Column = R.head(tableEntities(metaEd, namespace).get(reportCardStudentLearningObjective).columns);
    expect(column.name).toBe(reportCardEducationOrganizationId);
  });

  it('should have correct foreign key relationship', () => {
    const foreignKey: ForeignKey = R.head(
      tableEntities(metaEd, namespace).get(reportCardStudentLearningObjective).foreignKeys,
    );
    expect(foreignKey.foreignTableName).toBe(reportCard);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(reportCardEducationOrganizationId);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(educationOrganizationId);
  });
});
