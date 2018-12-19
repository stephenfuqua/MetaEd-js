import { newMetaEdEnvironment, newDomainEntity, newDomainEntityExtension, newNamespace, NoNamespace } from 'metaed-core';
import { MetaEdEnvironment, DomainEntity, DomainEntityExtension, Namespace } from 'metaed-core';
import { newTable } from 'metaed-plugin-edfi-ods';
import { Table } from 'metaed-plugin-edfi-ods';
import { enhance } from '../../../src/enhancer/domainMetadata/DomainEntityExtensionAggregateEnhancer';
import { NamespaceEdfiOdsApi } from '../../../src/model/Namespace';
import { NoAggregate } from '../../../src/model/domainMetadata/Aggregate';
import { Aggregate } from '../../../src/model/domainMetadata/Aggregate';
import { EntityTable } from '../../../src/model/domainMetadata/EntityTable';

describe('when enhancing domainEntity extensions', () => {
  const baseEntityName = 'BaseEntityName';
  const baseTableName = 'BaseTableName';
  const entityName = 'EntityName';
  const tableName = 'TableName';
  const namespaceName = 'namespace';
  const extensionNamespaceName = 'extension';

  let aggregate: Aggregate = NoAggregate;
  let extensionNamespace: Namespace = NoNamespace;

  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName,
      data: {
        edfiOdsApi: {
          aggregates: [],
        },
      },
    };
    extensionNamespace = {
      ...newNamespace(),
      namespaceName: extensionNamespaceName,
      isExtension: true,
      data: {
        edfiOdsApi: {
          aggregates: [],
        },
      },
    };
    extensionNamespace.dependencies.push(namespace);
    metaEd.namespace.set(namespace.namespaceName, namespace);
    metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);

    const baseEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: baseEntityName,
      namespace,
      data: {
        edfiOds: {
          odsTableName: baseTableName,
        },
        edfiOdsApi: {},
      },
    });
    namespace.entity.domainEntity.set(baseEntity.metaEdName, baseEntity);

    const table: Table = {
      ...newTable(),
      name: tableName,
      schema: extensionNamespaceName,
    };

    const entity: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      metaEdName: entityName,
      namespace: extensionNamespace,
      data: {
        edfiOds: {
          odsTableName: tableName,
          odsTables: [table],
        },
        edfiOdsApi: {},
      },
    });
    extensionNamespace.entity.domainEntityExtension.set(entity.metaEdName, entity);

    enhance(metaEd);
    ({ aggregate } = entity.data.edfiOdsApi);
  });

  it('should add aggregate to namespace', () => {
    const extensionNamespaceAggregates: Array<Aggregate> = (extensionNamespace.data.edfiOdsApi as NamespaceEdfiOdsApi)
      .aggregates;
    expect(extensionNamespaceAggregates).toHaveLength(1);
    expect(extensionNamespaceAggregates[0]).toBe(aggregate);
  });

  it('should create aggregate', () => {
    expect(aggregate).not.toBeNull();
    expect(aggregate.root).toBe(tableName);
    expect(aggregate.allowPrimaryKeyUpdates).toBe(false);
    expect(aggregate.isExtension).toBe(true);
  });

  it('should create entity tables', () => {
    expect(aggregate.entityTables).toHaveLength(1);
    const entityTable: EntityTable = aggregate.entityTables[0];
    expect(entityTable).not.toBeNull();
    expect(entityTable.schema).toBe(extensionNamespaceName);
    expect(entityTable.table).toBe(tableName);
  });
});
