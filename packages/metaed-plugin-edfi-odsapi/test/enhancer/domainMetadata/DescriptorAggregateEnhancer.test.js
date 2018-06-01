// @flow
import { newMetaEdEnvironment, newDescriptor, newNamespace, normalizeEnumerationSuffix } from 'metaed-core';
import type { MetaEdEnvironment, Descriptor, Namespace } from 'metaed-core';
import { newTable } from 'metaed-plugin-edfi-ods';
import type { Table } from 'metaed-plugin-edfi-ods';
import { enhance } from '../../../src/enhancer/domainMetadata/DescriptorAggregateEnhancer';
import type { NamespaceEdfiOdsApi } from '../../../src/model/Namespace';
import { NoAggregate } from '../../../src/model/domainMetadata/Aggregate';
import type { Aggregate } from '../../../src/model/domainMetadata/Aggregate';
import type { EntityTable } from '../../../src/model/domainMetadata/EntityTable';

describe('when enhancing descriptor with no map type', () => {
  const metaEdName: string = 'MetaEdName';
  const tableName: string = 'TableName';
  const namespaceName: string = 'namespace';

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
  let typeAggregate: Aggregate = NoAggregate;

  beforeAll(() => {
    aggregate = NoAggregate;
    typeAggregate = NoAggregate;

    const table: Table = {
      ...newTable(),
      name: tableName,
      schema: namespaceName,
    };

    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName,
      isMapTypeRequired: false,
      isMapTypeOptional: false,
      namespace,
      data: {
        edfiOds: {
          ods_TableName: tableName,
          ods_Tables: [table],
        },
        edfiOdsApi: {
          aggregate: NoAggregate,
          typeAggregate: NoAggregate,
        },
      },
    });
    namespace.entity.descriptor.set(descriptor.metaEdName, descriptor);

    enhance(metaEd);
    ({ aggregate, typeAggregate } = descriptor.data.edfiOdsApi);
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
    expect(typeAggregate).toBe(NoAggregate);
  });

  it('should create entity tables', () => {
    expect(aggregate.entityTables).toHaveLength(1);
    const entityTable: EntityTable = aggregate.entityTables[0];
    expect(entityTable).not.toBeNull();
    expect(entityTable.schema).toBe(namespaceName);
    expect(entityTable.table).toBe(tableName);
  });
});

describe('when enhancing descriptor with map type', () => {
  const entityName: string = 'EntityName';
  const descriptorTableName: string = `${entityName}Descriptor`;
  const typeTableName: string = normalizeEnumerationSuffix(entityName);
  const namespaceName: string = 'namespace';

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
  let typeAggregate: Aggregate = NoAggregate;

  beforeAll(() => {
    aggregate = NoAggregate;
    typeAggregate = NoAggregate;

    const descriptorTable: Table = {
      ...newTable(),
      name: descriptorTableName,
      schema: namespaceName,
    };

    const typeTable: Table = {
      ...newTable(),
      name: typeTableName,
      schema: namespaceName,
    };

    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: entityName,
      isMapTypeRequired: true,
      isMapTypeOptional: false,
      namespace,
      data: {
        edfiOds: {
          ods_TableName: descriptorTableName,
          ods_Tables: [descriptorTable, typeTable],
          ods_IsMapType: true,
        },
        edfiOdsApi: {
          aggregate: NoAggregate,
          typeAggregate: NoAggregate,
        },
      },
    });
    namespace.entity.descriptor.set(descriptor.metaEdName, descriptor);

    enhance(metaEd);
    ({ aggregate, typeAggregate } = descriptor.data.edfiOdsApi);
  });

  it('should add aggregate to namespace', () => {
    const namespaceAggregates: Array<Aggregate> = ((namespace.data.edfiOdsApi: any): NamespaceEdfiOdsApi).aggregates;
    expect(namespaceAggregates).toHaveLength(2);
    expect(namespaceAggregates).toContain(aggregate);
    expect(namespaceAggregates).toContain(typeAggregate);
  });

  it('should create aggregate', () => {
    expect(aggregate).not.toBeNull();
    expect(aggregate.root).toBe(descriptorTableName);
    expect(aggregate.allowPrimaryKeyUpdates).toBe(false);
    expect(aggregate.isExtension).toBe(false);
  });

  it('should create type aggregate', () => {
    expect(typeAggregate).not.toBeNull();
    expect(typeAggregate.root).toBe(typeTableName);
    expect(typeAggregate.allowPrimaryKeyUpdates).toBe(false);
    expect(typeAggregate.isExtension).toBe(false);
  });

  it('should create entity tables', () => {
    expect(aggregate.entityTables).toHaveLength(1);
    const descriptorEntityTable: EntityTable = aggregate.entityTables[0];
    expect(descriptorEntityTable).not.toBeNull();
    expect(descriptorEntityTable.schema).toBe(namespaceName);
    expect(descriptorEntityTable.table).toBe(descriptorTableName);

    expect(typeAggregate.entityTables).toHaveLength(1);
    const typeEntityTable: EntityTable = typeAggregate.entityTables[0];
    expect(typeEntityTable).not.toBeNull();
    expect(typeEntityTable.schema).toBe(namespaceName);
    expect(typeEntityTable.table).toBe(typeTableName);
  });
});
