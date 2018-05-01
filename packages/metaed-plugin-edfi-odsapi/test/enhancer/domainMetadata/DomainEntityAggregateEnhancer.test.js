// @flow
import { newMetaEdEnvironment, newDomainEntity, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, DomainEntity, Namespace } from 'metaed-core';
import { newTable } from 'metaed-plugin-edfi-ods';
import type { Table } from 'metaed-plugin-edfi-ods';
import { enhance } from '../../../src/enhancer/domainMetadata/DomainEntityAggregateEnhancer';
import type { NamespaceEdfiOdsApi } from '../../../src/model/Namespace';
import { NoAggregate } from '../../../src/model/domainMetadata/Aggregate';
import type { Aggregate } from '../../../src/model/domainMetadata/Aggregate';
import type { EntityTable } from '../../../src/model/domainMetadata/EntityTable';

describe('when enhancing a domain entity', () => {
  const metaEdName: string = 'MetaEdName';
  const tableName: string = 'TableName';
  const namespaceName: string = 'namespace';

  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
    data: {
      edfiOdsApi: {
        aggregates: [],
      },
    },
  });

  let aggregate: Aggregate = NoAggregate;

  beforeAll(() => {
    metaEd.entity.namespace.set(namespace.namespaceName, namespace);

    const table: Table = {
      ...newTable(),
      name: tableName,
      schema: namespaceName,
    };

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName,
      namespace: Object.assign(newNamespace(), {
        namespaceName,
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
    metaEd.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    enhance(metaEd);
    aggregate = domainEntity.data.edfiOdsApi.aggregate;
  });

  it('should add aggregate to namespace', () => {
    const namespaceAggregates: Array<Aggregate> = ((namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates;
    expect(namespaceAggregates).toHaveLength(1);
    expect(namespaceAggregates[0]).toBe(aggregate);
  });

  it('should create aggregate', () => {
    expect(aggregate).not.toBeNull();
    expect(aggregate.root).toBe(tableName);
    expect(aggregate.allowPrimaryKeyUpdates).toBe(false);
    expect(aggregate.isExtension).toBe(false);
  });

  it('should create entity tables', () => {
    expect(aggregate.entityTables).toHaveLength(1);
    const entityTable: EntityTable = aggregate.entityTables[0];
    expect(entityTable).not.toBeNull();
    expect(entityTable.schema).toBe(namespaceName);
    expect(entityTable.table).toBe(tableName);
  });
});

describe('when enhancing a domain entity that allows primary key updates', () => {
  const metaEdName: string = 'MetaEdName';
  const tableName: string = 'TableName';
  const namespaceName: string = 'namespace';

  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
    data: {
      edfiOdsApi: {
        aggregates: [],
      },
    },
  });

  let aggregate: Aggregate = NoAggregate;

  beforeAll(() => {
    metaEd.entity.namespace.set(namespace.namespaceName, namespace);

    const table: Table = {
      ...newTable(),
      name: tableName,
      schema: namespaceName,
    };

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName,
      allowPrimaryKeyUpdates: true,
      namespace: Object.assign(newNamespace(), {
        namespaceName,
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
    metaEd.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    enhance(metaEd);
    aggregate = domainEntity.data.edfiOdsApi.aggregate;
  });

  it('should create aggregate', () => {
    expect(aggregate).not.toBeNull();
    expect(aggregate.root).toBe(tableName);
    expect(aggregate.allowPrimaryKeyUpdates).toBe(true);
    expect(aggregate.isExtension).toBe(false);
  });

  it('should create entity tables', () => {
    expect(aggregate.entityTables).toHaveLength(1);
    const entityTable: EntityTable = aggregate.entityTables[0];
    expect(entityTable).not.toBeNull();
    expect(entityTable.schema).toBe(namespaceName);
    expect(entityTable.table).toBe(tableName);
  });
});

describe('when enhancing a domain entity that has a required collection table', () => {
  const metaEdName: string = 'MetaEdName';
  const tableName: string = 'TableName';
  const namespaceName: string = 'namespace';

  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
    data: {
      edfiOdsApi: {
        aggregates: [],
      },
    },
  });

  let aggregate: Aggregate = NoAggregate;

  beforeAll(() => {
    metaEd.entity.namespace.set(namespace.namespaceName, namespace);

    const table: Table = {
      ...newTable(),
      name: tableName,
      schema: namespaceName,
      isRequiredCollectionTable: true,
    };

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName,
      namespace: Object.assign(newNamespace(), {
        namespaceName,
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
    metaEd.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    enhance(metaEd);
    aggregate = domainEntity.data.edfiOdsApi.aggregate;
  });

  it('should add aggregate to namespace', () => {
    const namespaceAggregates: Array<Aggregate> = ((namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates;
    expect(namespaceAggregates).toHaveLength(1);
    expect(namespaceAggregates[0]).toBe(aggregate);
  });

  it('should create aggregate', () => {
    expect(aggregate).not.toBeNull();
    expect(aggregate.root).toBe(tableName);
    expect(aggregate.allowPrimaryKeyUpdates).toBe(false);
    expect(aggregate.isExtension).toBe(false);
  });

  it('should create entity tables', () => {
    expect(aggregate.entityTables).toHaveLength(1);
    const entityTable: EntityTable = aggregate.entityTables[0];
    expect(entityTable).not.toBeNull();
    expect(entityTable.schema).toBe(namespaceName);
    expect(entityTable.table).toBe(tableName);
    expect(entityTable.isRequiredCollection).toBe(true);
  });
});
