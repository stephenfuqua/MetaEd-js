// @flow
import { newMetaEdEnvironment, newDomainEntity, newDomainEntityExtension, newNamespace, NoNamespace } from 'metaed-core';
import type { MetaEdEnvironment, DomainEntity, DomainEntityExtension, Namespace } from 'metaed-core';
import { newTable } from 'metaed-plugin-edfi-ods';
import type { Table } from 'metaed-plugin-edfi-ods';
import { enhance } from '../../../src/enhancer/domainMetadata/DomainEntityExtensionAggregateEnhancer';
import type { NamespaceEdfiOdsApi } from '../../../src/model/Namespace';
import { NoAggregate } from '../../../src/model/domainMetadata/Aggregate';
import type { Aggregate } from '../../../src/model/domainMetadata/Aggregate';
import type { EntityTable } from '../../../src/model/domainMetadata/EntityTable';

describe('when enhancing domainEntity extensions', () => {
  const baseEntityName: string = 'BaseEntityName';
  const baseTableName: string = 'BaseTableName';
  const entityName: string = 'EntityName';
  const tableName: string = 'TableName';
  const namespaceName: string = 'namespace';
  const extensionNamespaceName: string = 'extension';

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
          ods_TableName: baseTableName,
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
          ods_TableName: tableName,
          ods_Tables: [table],
        },
        edfiOdsApi: {},
      },
    });
    extensionNamespace.entity.domainEntityExtension.set(entity.metaEdName, entity);

    enhance(metaEd);
    ({ aggregate } = entity.data.edfiOdsApi);
  });

  it('should add aggregate to namespace', () => {
    const extensionNamespaceAggregates: Array<Aggregate> = ((extensionNamespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi)
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
