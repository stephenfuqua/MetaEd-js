// @flow
import R from 'ramda';
import type { MetaEdEnvironment } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/ModifyReverseForeignKeyIndexesDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import type { ForeignKey } from '../../src/model/database/ForeignKey';
import type { Table } from '../../src/model/database/Table';

describe('when ModifyReverseForeignKeyIndexesDiminisher diminishes matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const assessmentContentStandard: string = 'AssessmentContentStandard';
  const assessment: string = 'Assessment';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: assessmentContentStandard,
      foreignKeys: [
        Object.assign(newForeignKey(), {
          parentTableName: assessmentContentStandard,
          foreignTableName: assessment,
          withReverseForeignKeyIndex: false,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should modify with reverse foreign key index', () => {
    const foreignKey: ForeignKey = R.head(tableEntities(metaEd, namespace).get(assessmentContentStandard).foreignKeys);
    expect(foreignKey.parentTableName).toBe(assessmentContentStandard);
    expect(foreignKey.foreignTableName).toBe(assessment);
    expect(foreignKey.withReverseForeignKeyIndex).toBe(true);
  });
});

describe('when ModifyReverseForeignKeyIndexesDiminisher diminishes non matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentTableName: string = 'ParentTableName';
  const foreignTableName: string = 'ForeignTableName';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: parentTableName,
      foreignKeys: [
        Object.assign(newForeignKey(), {
          parentTableName,
          foreignTableName,
          withReverseForeignKeyIndex: false,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should not modify with reverse foreign key index', () => {
    const foreignKey: ForeignKey = R.head(tableEntities(metaEd, namespace).get(parentTableName).foreignKeys);
    expect(foreignKey.parentTableName).toBe(parentTableName);
    expect(foreignKey.foreignTableName).toBe(foreignTableName);
    expect(foreignKey.withReverseForeignKeyIndex).toBe(false);
  });
});
