import { newMetaEdEnvironment, newDomainEntity, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, DomainEntity, Namespace } from 'metaed-core';
import { newTable } from 'metaed-plugin-edfi-ods';
import { Table } from 'metaed-plugin-edfi-ods';
import { enhance } from '../../../src/enhancer/domainMetadata/DomainEntityAggregateEnhancer';
import { NamespaceEdfiOdsApi } from '../../../src/model/Namespace';
import { NoAggregate } from '../../../src/model/domainMetadata/Aggregate';
import { Aggregate } from '../../../src/model/domainMetadata/Aggregate';
import { EntityTable } from '../../../src/model/domainMetadata/EntityTable';

describe('when enhancing a domain entity', () => {
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const namespaceName = 'Namespace';
  const schema = namespaceName.toLowerCase();

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
  metaEd.namespace.set(namespace.namespaceName, namespace);
  let aggregate: Aggregate = NoAggregate;

  beforeAll(() => {
    const table: Table = {
      ...newTable(),
      name: tableName,
      schema,
    };

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName,
      namespace,
      data: {
        edfiOds: {
          odsTableName: tableName,
          odsTables: [table],
        },
        edfiOdsApi: {},
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    enhance(metaEd);
    ({ aggregate } = domainEntity.data.edfiOdsApi);
  });

  it('should add aggregate to namespace', () => {
    const namespaceAggregates: Array<Aggregate> = (namespace.data.edfiOdsApi as NamespaceEdfiOdsApi).aggregates;
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
    expect(entityTable.schema).toBe(schema);
    expect(entityTable.table).toBe(tableName);
  });
});

describe('when enhancing a domain entity that allows primary key updates', () => {
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const namespaceName = 'Namespace';
  const schema = namespaceName.toLowerCase();

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
  metaEd.namespace.set(namespace.namespaceName, namespace);
  let aggregate: Aggregate = NoAggregate;

  beforeAll(() => {
    const table: Table = {
      ...newTable(),
      name: tableName,
      schema,
    };

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName,
      allowPrimaryKeyUpdates: true,
      namespace,
      data: {
        edfiOds: {
          odsTableName: tableName,
          odsTables: [table],
        },
        edfiOdsApi: {},
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    enhance(metaEd);
    ({ aggregate } = domainEntity.data.edfiOdsApi);
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
    expect(entityTable.schema).toBe(schema);
    expect(entityTable.table).toBe(tableName);
  });
});

describe('when enhancing a domain entity that has a required collection table', () => {
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const namespaceName = 'Namespace';
  const schema = namespaceName.toLowerCase();

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
  metaEd.namespace.set(namespace.namespaceName, namespace);
  let aggregate: Aggregate = NoAggregate;

  beforeAll(() => {
    const table: Table = {
      ...newTable(),
      name: tableName,
      schema,
      isRequiredCollectionTable: true,
    };

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName,
      namespace,
      data: {
        edfiOds: {
          odsTableName: tableName,
          odsTables: [table],
        },
        edfiOdsApi: {},
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

    enhance(metaEd);
    ({ aggregate } = domainEntity.data.edfiOdsApi);
  });

  it('should add aggregate to namespace', () => {
    const namespaceAggregates: Array<Aggregate> = (namespace.data.edfiOdsApi as NamespaceEdfiOdsApi).aggregates;
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
    expect(entityTable.schema).toBe(schema);
    expect(entityTable.table).toBe(tableName);
    expect(entityTable.isRequiredCollection).toBe(true);
  });
});
