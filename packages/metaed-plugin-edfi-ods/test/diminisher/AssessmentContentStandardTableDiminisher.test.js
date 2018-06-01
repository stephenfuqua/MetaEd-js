// @flow
import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/AssessmentContentStandardTableDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newColumn } from '../../src/model/database/Column';
import { newColumnNamePair } from '../../src/model/database/ColumnNamePair';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import type { Column } from '../../src/model/database/Column';
import type { ForeignKey } from '../../src/model/database/ForeignKey';
import type { Table } from '../../src/model/database/Table';

describe('when AssessmentContentStandardTableDiminisher diminishes AssessmentContentStandard table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const assessment: string = 'Assessment';
  const assessmentContentStandard: string = 'AssessmentContentStandard';
  const assessmentVersion: string = 'AssessmentVersion';
  const version: string = 'Version';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: assessmentContentStandard,
      columns: [
        Object.assign(newColumn(), {
          name: version,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: assessment,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: version,
              foreignTableColumnName: version,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should add AssessmentVersion column', () => {
    // $FlowIgnore null check
    const { columns }: Array<Column> = tableEntities(metaEd, namespace).get(assessmentContentStandard);
    expect(columns).toHaveLength(2);
    expect(R.head(columns).name).toBe(version);
    expect(R.last(columns).name).toBe(assessmentVersion);
  });

  it('should modify assessment column to be nullable non primary key', () => {
    // $FlowIgnore null check
    const column: Column = R.head(tableEntities(metaEd, namespace).get(assessmentContentStandard).columns);
    expect(column.name).toBe(version);
    expect(column.isNullable).toBe(true);
    expect(column.isPartOfPrimaryKey).toBe(false);
  });

  it('should have correct foreign key relationship', () => {
    // $FlowIgnore null check
    const foreignKey: ForeignKey = R.head(tableEntities(metaEd, namespace).get(assessmentContentStandard).foreignKeys);
    expect(foreignKey.foreignTableName).toBe(assessment);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(assessmentVersion);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(version);
  });
});

describe('when AssessmentContentStandardTableDiminisher diminishes AssessmentContentStandardAuthor table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const assessmentContentStandard: string = 'AssessmentContentStandard';
  const assessmentContentStandardAuthor: string = 'AssessmentContentStandardAuthor';
  const assessmentVersion: string = 'AssessmentVersion';
  const version: string = 'Version';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: assessmentContentStandardAuthor,
      columns: [
        Object.assign(newColumn(), {
          name: version,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: assessmentContentStandard,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: version,
              foreignTableColumnName: version,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should rename Version column to AssessmentVersion', () => {
    // $FlowIgnore null check
    const { columns }: Array<Column> = tableEntities(metaEd, namespace).get(assessmentContentStandardAuthor);
    expect(columns).toHaveLength(1);
    expect(R.head(columns).name).toBe(assessmentVersion);
  });

  it('should have correct foreign key relationship', () => {
    // $FlowIgnore null check
    const foreignKey: ForeignKey = R.head(tableEntities(metaEd, namespace).get(assessmentContentStandardAuthor).foreignKeys);
    expect(foreignKey.foreignTableName).toBe(assessmentContentStandard);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(assessmentVersion);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(assessmentVersion);
  });
});

describe('when AssessmentContentStandardTableDiminisher diminishes AssessmentContentStandard table with existing AssessmentVersion column', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const assessment: string = 'Assessment';
  const assessmentContentStandard: string = 'AssessmentContentStandard';
  const assessmentVersion: string = 'AssessmentVersion';
  const version: string = 'Version';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: assessmentContentStandard,
      columns: [
        Object.assign(newColumn(), {
          name: assessmentVersion,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: assessment,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: version,
              foreignTableColumnName: version,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should not add additional columns', () => {
    // $FlowIgnore null check
    const { columns }: Array<Column> = tableEntities(metaEd, namespace).get(assessmentContentStandard);
    expect(columns).toHaveLength(1);
    expect(R.head(columns).name).toBe(assessmentVersion);
  });

  it('should have unmodified foreign key relationship', () => {
    // $FlowIgnore null check
    const foreignKey: ForeignKey = R.head(tableEntities(metaEd, namespace).get(assessmentContentStandard).foreignKeys);
    expect(foreignKey.foreignTableName).toBe(assessment);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(version);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(version);
  });
});

describe('when AssessmentContentStandardTableDiminisher diminishes AssessmentContentStandardAuthor table with existing AssessmentVersion column', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const assessmentContentStandard: string = 'AssessmentContentStandard';
  const assessmentContentStandardAuthor: string = 'AssessmentContentStandardAuthor';
  const assessmentVersion: string = 'AssessmentVersion';
  const version: string = 'Version';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: assessmentContentStandardAuthor,
      columns: [
        Object.assign(newColumn(), {
          name: assessmentVersion,
        }),
      ],
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: assessmentContentStandard,
          columnNames: [
            Object.assign(newColumnNamePair(), {
              parentTableColumnName: version,
              foreignTableColumnName: version,
            }),
          ],
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should have AssessmentVersion column', () => {
    // $FlowIgnore null check
    const { columns }: Array<Column> = tableEntities(metaEd, namespace).get(assessmentContentStandardAuthor);
    expect(columns).toHaveLength(1);
    expect(R.head(columns).name).toBe(assessmentVersion);
  });

  it('should have unmodified foreign key relationship', () => {
    // $FlowIgnore null check
    const foreignKey: ForeignKey = R.head(tableEntities(metaEd, namespace).get(assessmentContentStandardAuthor).foreignKeys);
    expect(foreignKey.foreignTableName).toBe(assessmentContentStandard);
    expect(R.head(foreignKey.columnNames).parentTableColumnName).toBe(version);
    expect(R.head(foreignKey.columnNames).foreignTableColumnName).toBe(version);
  });
});
