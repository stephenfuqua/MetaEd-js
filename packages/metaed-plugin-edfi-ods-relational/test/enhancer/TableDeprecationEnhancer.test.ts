import { MetaEdEnvironment, Namespace, newDomainEntity, newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/TableDeprecationEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../src/model/EdFiOdsEntityRepository';
import { newTable, Table } from '../../src/model/database/Table';
import { tableEntities } from '../../src/enhancer/EnhancerHelper';

describe('when table parent entity has deprecation', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const tableName = 'TableName';
  const deprecationReason = 'DeprecationReason';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);
    const parentEntity = { ...newDomainEntity(), isDeprecated: true, deprecationReason };
    const table: Table = { ...newTable(), name: tableName, parentEntity };
    tableEntities(metaEd, namespace).set(table.name, table);

    enhance(metaEd);
  });

  it('should have correct deprecation status', (): void => {
    const { isDeprecated, deprecationReasons } = tableEntities(metaEd, namespace).get(tableName) as Table;
    expect(isDeprecated).toBe(true);
    expect(deprecationReasons).toHaveLength(1);
    expect(deprecationReasons[0]).toBe(deprecationReason);
  });
});
