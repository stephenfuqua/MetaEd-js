import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/ModifyCascadingDeletesDefinitionsDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { ForeignKey } from '../../src/model/database/ForeignKey';
import { Table } from '../../src/model/database/Table';

describe('when ModifyCascadingDeletesDefinitionsDiminisher diminishes matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const assessmentCategoryDescriptor = 'AssessmentCategoryDescriptor';
  const descriptor = 'Descriptor';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: assessmentCategoryDescriptor,
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: descriptor,
          withDeleteCascade: true,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should modify with delete cascade', () => {
    const foreignKey: ForeignKey = R.head(
      (tableEntities(metaEd, namespace).get(assessmentCategoryDescriptor) as Table).foreignKeys,
    );
    expect(foreignKey.foreignTableName).toBe(descriptor);
    expect(foreignKey.withDeleteCascade).toBe(false);
  });
});

describe('when ModifyCascadingDeletesDefinitionsDiminisher diminishes non matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName = 'TableName';
  const foreignTableName = 'ForeignTableName';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName,
          withDeleteCascade: true,
        }),
      ],
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    metaEd.dataStandardVersion = '2.0.0';
    enhance(metaEd);
  });

  it('should not modify with delete cascade', () => {
    const foreignKey: ForeignKey = R.head((tableEntities(metaEd, namespace).get(tableName) as Table).foreignKeys);
    expect(foreignKey.foreignTableName).toBe(foreignTableName);
    expect(foreignKey.withDeleteCascade).toBe(true);
  });
});
