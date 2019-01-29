import R from 'ramda';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../src/diminisher/ModifyCascadingUpdatesDefinitionsDiminisher';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newForeignKey } from '../../src/model/database/ForeignKey';
import { newTable } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';
import { ForeignKey } from '../../src/model/database/ForeignKey';
import { Table } from '../../src/model/database/Table';

describe('when ModifyCascadingUpdatesDefinitionsDiminisher diminishes matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const courseOfferingCurriculumUsed = 'CourseOfferingCurriculumUsed';
  const courseOffering = 'CourseOffering';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: courseOfferingCurriculumUsed,
      foreignKeys: [
        Object.assign(newForeignKey(), {
          foreignTableName: courseOffering,
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
      (tableEntities(metaEd, namespace).get(courseOfferingCurriculumUsed) as Table).foreignKeys,
    );
    expect(foreignKey.foreignTableName).toBe(courseOffering);
    expect(foreignKey.withUpdateCascade).toBe(false);
  });
});

describe('when ModifyCascadingUpdatesDefinitionsDiminisher diminishes non matching table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
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
