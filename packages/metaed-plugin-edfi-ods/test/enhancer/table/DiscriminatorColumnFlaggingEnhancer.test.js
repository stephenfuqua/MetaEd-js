// @flow

import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace, newDomainEntity, newPluginEnvironment } from 'metaed-core';
import { enhance } from '../../../src/enhancer/table/DiscriminatorColumnFlaggingEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';
import { newTable } from '../../../src/model/database/Table';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import type { Table } from '../../../src/model/database/Table';

describe('when DiscriminatorColumnFlaggingEnhancer enhances table with DE parent and aggregate root on 3.1', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.plugin.set(
    'edfiOds',
    Object.assign(newPluginEnvironment(), {
      targetTechnologyVersion: '3.1.0',
    }),
  );

  const tableName: string = 'TableName';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      schema: namespace.namespaceName,
      parentEntity: newDomainEntity(),
      isAggregateRootTable: true,
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    enhance(metaEd);
  });

  it('should have hasDiscriminatorColumn set to true', () => {
    // $FlowIgnore - null check
    expect(tableEntities(metaEd, namespace).get(tableName).hasDiscriminatorColumn).toBe(true);
  });
});

describe('when DiscriminatorColumnFlaggingEnhancer enhances table with DE parent and aggregate root on 2.0', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.plugin.set(
    'edfiOds',
    Object.assign(newPluginEnvironment(), {
      targetTechnologyVersion: '2.0.0',
    }),
  );

  const tableName: string = 'TableName';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      schema: namespace.namespaceName,
      parentEntity: newDomainEntity(),
      isAggregateRootTable: true,
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    enhance(metaEd);
  });

  it('should have hasDiscriminatorColumn set to false', () => {
    // $FlowIgnore - null check
    expect(tableEntities(metaEd, namespace).get(tableName).hasDiscriminatorColumn).toBe(false);
  });
});

describe('when DiscriminatorColumnFlaggingEnhancer enhances table with no parent', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.plugin.set(
    'edfiOds',
    Object.assign(newPluginEnvironment(), {
      targetTechnologyVersion: '3.1.0',
    }),
  );

  const tableName: string = 'TableName';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      schema: namespace.namespaceName,
      isAggregateRootTable: true, // FYI: not actually possible to be aggregate root without parent
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    enhance(metaEd);
  });

  it('should have hasDiscriminatorColumn set to false', () => {
    // $FlowIgnore - null check
    expect(tableEntities(metaEd, namespace).get(tableName).hasDiscriminatorColumn).toBe(false);
  });
});

describe('when DiscriminatorColumnFlaggingEnhancer enhances non aggregate root table', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.plugin.set(
    'edfiOds',
    Object.assign(newPluginEnvironment(), {
      targetTechnologyVersion: '3.1.0',
    }),
  );

  const tableName: string = 'TableName';

  beforeAll(() => {
    initializeEdFiOdsEntityRepository(metaEd);

    const table: Table = Object.assign(newTable(), {
      name: tableName,
      schema: namespace.namespaceName,
      parentEntity: newDomainEntity(),
      isAggregateRootTable: false,
    });
    tableEntities(metaEd, namespace).set(table.name, table);

    enhance(metaEd);
  });

  it('should have hasDiscriminatorColumn set to false', () => {
    // $FlowIgnore - null check
    expect(tableEntities(metaEd, namespace).get(tableName).hasDiscriminatorColumn).toBe(false);
  });
});
