// @flow
import { newMetaEdEnvironment, newAssociation, newAssociationExtension, newNamespace, NoNamespace } from 'metaed-core';
import type { MetaEdEnvironment, Association, AssociationExtension, Namespace } from 'metaed-core';
import { newTable } from 'metaed-plugin-edfi-ods';
import type { Table } from 'metaed-plugin-edfi-ods';
import { enhance } from '../../../src/enhancer/domainMetadata/AssociationExtensionAggregateEnhancer';
import type { NamespaceEdfiOdsApi } from '../../../src/model/Namespace';
import { NoAggregate } from '../../../src/model/domainMetadata/Aggregate';
import type { Aggregate } from '../../../src/model/domainMetadata/Aggregate';
import type { EntityTable } from '../../../src/model/domainMetadata/EntityTable';

describe('when enhancing association extensions', () => {
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
    const namespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
      data: {
        edfiOdsApi: {
          aggregates: [],
        },
      },
    });
    extensionNamespace = Object.assign(newNamespace(), {
      namespaceName: extensionNamespaceName,
      isExtension: true,
      data: {
        edfiOdsApi: {
          aggregates: [],
        },
      },
    });
    metaEd.entity.namespace.set(namespace.namespaceName, namespace);
    metaEd.entity.namespace.set(extensionNamespace.namespaceName, extensionNamespace);

    const baseEntity: Association = Object.assign(newAssociation(), {
      metaEdName: baseEntityName,
      namespace,
      data: {
        edfiOds: {
          ods_TableName: baseTableName,
        },
        edfiOdsApi: {},
      },
    });
    metaEd.entity.association.set(baseEntity.metaEdName, baseEntity);

    const table: Table = {
      ...newTable(),
      name: tableName,
      schema: extensionNamespaceName,
    };

    const entity: AssociationExtension = Object.assign(newAssociationExtension(), {
      metaEdName: entityName,
      namespace: Object.assign(newNamespace(), {
        namespaceName: extensionNamespaceName,
        isExtension: true,
        data: {
          edfiOdsApi: {
            aggregates: [],
          },
        },
      }),
      data: {
        edfiOds: {
          ods_TableName: tableName,
          ods_Tables: [table],
        },
        edfiOdsApi: {},
      },
    });
    metaEd.entity.associationExtension.set(entity.metaEdName, entity);

    enhance(metaEd);
    aggregate = entity.data.edfiOdsApi.aggregate;
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
