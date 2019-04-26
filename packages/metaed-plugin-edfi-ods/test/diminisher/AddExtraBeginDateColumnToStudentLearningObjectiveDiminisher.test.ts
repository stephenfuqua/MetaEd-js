import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/AddExtraBeginDateColumnToStudentLearningObjectiveDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { ForeignKey } from '../../src/model/database/ForeignKey';
import { Table } from '../../src/model/database/Table';

describe('when AddExtraBeginDateColumnToStudentLearningObjectiveDiminisher diminishes StudentLearningObjective table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const studentLearningObjective = 'StudentLearningObjective';
  const studentSectionAssociation = 'StudentSectionAssociation';
  const beginDate = 'BeginDate';
  const studentSectionAssociationBeginDate: string = studentSectionAssociation + beginDate;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentLearningObjective,
      nameComponents: [studentLearningObjective],
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
    const table: Table | undefined = tableEntities(metaEd, namespace).get(studentLearningObjective);
    expect(table).toBeDefined();
    if (table == null) throw new Error();
    expect(R.head(table.columns).name).toBe(studentSectionAssociationBeginDate);
    expect(R.head(table.columns).isNullable).toBe(true);
  });

  it('should have correct foreign key relationship', () => {
    const foreignKey: ForeignKey | null = R.head(
      (tableEntities(metaEd, namespace).get(studentLearningObjective) as any).foreignKeys,
    );
    if (foreignKey == null) throw new Error();
    expect(foreignKey.foreignTableName).toBe(studentSectionAssociation);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(studentSectionAssociationBeginDate);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(beginDate);
  });
});

describe('when AddExtraBeginDateColumnToStudentLearningObjectiveDiminisher diminishes StudentLearningObjective table with existing studentSectionAssociationBeginDate column', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const studentLearningObjective = 'StudentLearningObjective';
  const studentSectionAssociation = 'StudentSectionAssociation';
  const beginDate = 'BeginDate';
  const studentSectionAssociationBeginDate: string = studentSectionAssociation + beginDate;

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: studentLearningObjective,
      nameComponents: [studentLearningObjective],
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
    const table: Table | undefined = tableEntities(metaEd, namespace).get(studentLearningObjective);
    expect(table).toBeDefined();
    if (table == null) throw new Error();
    expect(table.columns).toHaveLength(1);
    expect(R.head(table.columns).name).toBe(studentSectionAssociationBeginDate);
    expect(R.head(table.columns).isNullable).toBe(false);
  });

  it('should not modify foreign keys', () => {
    expect((tableEntities(metaEd, namespace).get(studentLearningObjective) as any).foreignKeys).toHaveLength(0);
  });
});
