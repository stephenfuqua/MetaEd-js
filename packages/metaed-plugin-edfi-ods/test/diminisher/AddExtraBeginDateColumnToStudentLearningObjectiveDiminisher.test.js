// @flow
import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/AddExtraBeginDateColumnToStudentLearningObjectiveDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import type { ForeignKey } from '../../src/model/database/ForeignKey';
import type { Table } from '../../src/model/database/Table';

describe('when AddExtraBeginDateColumnToStudentLearningObjectiveDiminisher diminishes StudentLearningObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const studentLearningObjective: string = 'StudentLearningObjective';
  const studentSectionAssociation: string = 'StudentSectionAssociation';
  const beginDate: string = 'BeginDate';
  const studentSectionAssociationBeginDate: string = studentSectionAssociation + beginDate;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentLearningObjective,
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: studentSectionAssociation,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: beginDate,
              foreignTableColumnName: beginDate,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should add StudentSectionAssociationBeginDate column', () => {
    const table: ?Table = tableEntities(metaEd, namespace).get(studentLearningObjective);
    expect(table).toBeDefined();
    // $FlowIgnore - null check
    expect(R.head(table.columns).name).toBe(studentSectionAssociationBeginDate);
    // $FlowIgnore - null check
    expect(R.head(table.columns).isNullable).toBe(true);
  });

  it('should have correct foreign key relationship', () => {
    // $FlowIgnore - null check
    const foreignKey: ?ForeignKey = R.head(tableEntities(metaEd, namespace).get(studentLearningObjective).foreignKeys);
    // $FlowIgnore - null check
    expect(foreignKey.foreignTableName).toBe(studentSectionAssociation);
    // $FlowIgnore - null check
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(studentSectionAssociationBeginDate);
    // $FlowIgnore - null check
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(beginDate);
  });
});

describe('when AddExtraBeginDateColumnToStudentLearningObjectiveDiminisher diminishes StudentLearningObjective table with existing studentSectionAssociationBeginDate column', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const studentLearningObjective: string = 'StudentLearningObjective';
  const studentSectionAssociation: string = 'StudentSectionAssociation';
  const beginDate: string = 'BeginDate';
  const studentSectionAssociationBeginDate: string = studentSectionAssociation + beginDate;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentLearningObjective,
      columns: [
        Object.assign(newColumn(), {
          name: studentSectionAssociationBeginDate,
          isNullable: false,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should not modify StudentSectionAssociationBeginDate column', () => {
    const table: ?Table = tableEntities(metaEd, namespace).get(studentLearningObjective);
    expect(table).toBeDefined();
    // $FlowIgnore - null check
    expect(table.columns).toHaveLength(1);
    // $FlowIgnore - null check
    expect(R.head(table.columns).name).toBe(studentSectionAssociationBeginDate);
    // $FlowIgnore - null check
    expect(R.head(table.columns).isNullable).toBe(false);
  });

  it('should not modify foreign keys', () => {
    // $FlowIgnore - null check
    expect(tableEntities(metaEd, namespace).get(studentLearningObjective).foreignKeys).toHaveLength(0);
  });
});
