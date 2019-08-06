import { newMetaEdEnvironment, newDomainEntity, newDomainEntityExtension, newNamespace, NoNamespace } from 'metaed-core';
import { MetaEdEnvironment, DomainEntity, DomainEntityExtension, Namespace } from 'metaed-core';
import { newTable, initializeEdFiOdsRelationalEntityRepository, tableEntities } from 'metaed-plugin-edfi-ods-relational';
import { Table } from 'metaed-plugin-edfi-ods-relational';
import { enhance } from '../../../src/enhancer/domainMetadata/DomainEntityExtensionAggregateEnhancer';
import { NamespaceEdfiOdsApi } from '../../../src/model/Namespace';
import { NoAggregate } from '../../../src/model/domainMetadata/Aggregate';
import { Aggregate } from '../../../src/model/domainMetadata/Aggregate';
import { EntityTable } from '../../../src/model/domainMetadata/EntityTable';

describe('when enhancing domainEntity extensions', (): void => {
  const entityName = 'EntityName';
  const tableName = 'TableName';
  const namespaceName = 'Namespace';
  const extensionNamespaceName = 'Extension';
  const extensionSchema = extensionNamespaceName.toLowerCase();

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

    initializeEdFiOdsRelationalEntityRepository(metaEd);

    const baseEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      namespace,
      data: {
        edfiOdsRelational: {
          odsTableId: tableName,
        },
        edfiOdsApi: {},
      },
    });
    namespace.entity.domainEntity.set(baseEntity.metaEdName, baseEntity);

    const baseEntityTable: Table = {
      ...newTable(),
      tableId: tableName,
      schema: 'namespace',
      data: { edfiOdsSqlServer: { tableName } },
    };
    tableEntities(metaEd, namespace).set(baseEntityTable.tableId, baseEntityTable);

    const table: Table = {
      ...newTable(),
      tableId: tableName,
      schema: extensionSchema,
      data: { edfiOdsSqlServer: { tableName } },
    };
    tableEntities(metaEd, extensionNamespace).set(table.tableId, table);

    const entity: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      metaEdName: entityName,
      namespace: extensionNamespace,
      baseEntity,
      data: {
        edfiOdsRelational: {
          odsTableId: tableName,
          odsTables: [table],
        },
        edfiOdsApi: {},
      },
    });
    extensionNamespace.entity.domainEntityExtension.set(entity.metaEdName, entity);

    enhance(metaEd);
    ({ aggregate } = entity.data.edfiOdsApi);
  });

  it('should add aggregate to namespace', (): void => {
    const extensionNamespaceAggregates: Aggregate[] = (extensionNamespace.data.edfiOdsApi as NamespaceEdfiOdsApi).aggregates;
    expect(extensionNamespaceAggregates).toHaveLength(1);
    expect(extensionNamespaceAggregates[0]).toBe(aggregate);
  });

  it('should create aggregate', (): void => {
    expect(aggregate).not.toBeNull();
    expect(aggregate.root).toBe(tableName);
    expect(aggregate.allowPrimaryKeyUpdates).toBe(false);
    expect(aggregate.isExtension).toBe(true);
  });

  it('should create entity tables', (): void => {
    expect(aggregate.entityTables).toHaveLength(1);
    const entityTable: EntityTable = aggregate.entityTables[0];
    expect(entityTable).not.toBeNull();
    expect(entityTable.schema).toBe(extensionSchema);
    expect(entityTable.table).toBe(tableName);
  });
});
