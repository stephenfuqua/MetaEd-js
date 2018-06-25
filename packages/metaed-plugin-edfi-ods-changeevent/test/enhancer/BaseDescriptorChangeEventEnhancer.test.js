// @flow
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import { baseDescriptorTableCreatingEnhancer, addEdFiOdsEntityRepositoryTo } from 'metaed-plugin-edfi-ods';
import { addEdFiOdsChangeEventEntityRepositoryTo } from '../../src/model/EdFiOdsChangeEventEntityRepository';
import { enhance } from '../../src/enhancer/BaseDescriptorChangeEventEnhancer';
import { metaEdEnvironmentForApiVersion, newCoreNamespace } from './TestHelper';
import {
  deleteTrackingTableEntities,
  deleteTrackingTriggerEntities,
  enableChangeTrackingEntities,
} from '../../src/enhancer/EnhancerHelper';

describe('when enhancing base descriptor targeting 2.3 ODS/API', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('2.3.0');
  const namespace: Namespace = newCoreNamespace();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeEventEntityRepositoryTo(metaEd);
  addEdFiOdsEntityRepositoryTo(metaEd);

  beforeAll(() => {
    baseDescriptorTableCreatingEnhancer(metaEd);
    enhance(metaEd);
  });

  it('should not create delete tracking table', () => {
    const deleteTrackingTables = deleteTrackingTableEntities(metaEd, namespace);
    expect(deleteTrackingTables).toHaveLength(0);
  });

  it('should not create delete tracking trigger', () => {
    const deleteTrackingTriggers = deleteTrackingTriggerEntities(metaEd, namespace);
    expect(deleteTrackingTriggers).toHaveLength(0);
  });

  it('should not create enable change tracking', () => {
    const enableChangeTracking = enableChangeTrackingEntities(metaEd, namespace);
    expect(enableChangeTracking).toHaveLength(0);
  });
});

describe('when enhancing base descriptor targeting 2.4 ODS/API', () => {
  const namespaceName: string = 'edfi';
  const tableName: string = 'Descriptor';
  const pkColumnName: string = 'DescriptorId';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('2.4.0');
  const namespace: Namespace = newCoreNamespace();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeEventEntityRepositoryTo(metaEd);
  addEdFiOdsEntityRepositoryTo(metaEd);

  beforeAll(() => {
    baseDescriptorTableCreatingEnhancer(metaEd);
    enhance(metaEd);
  });

  it('should create delete tracking table', () => {
    const deleteTrackingTables = deleteTrackingTableEntities(metaEd, namespace);
    expect(deleteTrackingTables).toHaveLength(1);
    expect(deleteTrackingTables[0].schema).toBe('dbo');
    expect(deleteTrackingTables[0].tableName).toBe(`${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTables[0].columns).toHaveLength(3);
    expect(deleteTrackingTables[0].columns[0].name).toBe(pkColumnName);
    expect(deleteTrackingTables[0].columns[1].name).toBe('Id');
    expect(deleteTrackingTables[0].columns[2].name).toBe('SystemChangeVersion');
    expect(deleteTrackingTables[0].primaryKeyName).toBe(`PK_${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTables[0].primaryKeyColumns).toHaveLength(1);
    expect(deleteTrackingTables[0].primaryKeyColumns[0].name).toBe(pkColumnName);
  });

  it('should create delete tracking trigger', () => {
    const deleteTrackingTriggers = deleteTrackingTriggerEntities(metaEd, namespace);
    expect(deleteTrackingTriggers).toHaveLength(1);
    expect(deleteTrackingTriggers[0].triggerSchema).toBe(namespaceName);
    expect(deleteTrackingTriggers[0].triggerName).toBe(`${tableName}DeletedForTracking`);
    expect(deleteTrackingTriggers[0].targetTableSchema).toBe(namespaceName);
    expect(deleteTrackingTriggers[0].targetTableName).toBe(tableName);
    expect(deleteTrackingTriggers[0].deleteTrackingTableSchema).toBe('dbo');
    expect(deleteTrackingTriggers[0].deleteTrackingTableName).toBe(`${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTriggers[0].primaryKeyColumnNames).toHaveLength(1);
    expect(deleteTrackingTriggers[0].primaryKeyColumnNames[0]).toBe(pkColumnName);
    expect(deleteTrackingTriggers[0].targetTableIsSubclass).toBe(false);
    expect(deleteTrackingTriggers[0].foreignKeyToSuperclass).toBeNull();
  });

  it('should create enable change tracking', () => {
    const enableChangeTracking = enableChangeTrackingEntities(metaEd, namespace);
    expect(enableChangeTracking).toHaveLength(1);
    expect(enableChangeTracking[0].schema).toBe(namespaceName);
    expect(enableChangeTracking[0].tableName).toBe(tableName);
  });
});

describe('when enhancing base descriptor targeting 3.1 ODS/API', () => {
  const namespaceName: string = 'edfi';
  const tableName: string = 'Descriptor';
  const pkColumnName: string = 'DescriptorId';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('3.1.0');
  const namespace: Namespace = newCoreNamespace();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeEventEntityRepositoryTo(metaEd);
  addEdFiOdsEntityRepositoryTo(metaEd);

  beforeAll(() => {
    baseDescriptorTableCreatingEnhancer(metaEd);
    enhance(metaEd);
  });

  it('should create delete tracking table', () => {
    const deleteTrackingTables = deleteTrackingTableEntities(metaEd, namespace);
    expect(deleteTrackingTables).toHaveLength(1);
    expect(deleteTrackingTables[0].schema).toBe('changes');
    expect(deleteTrackingTables[0].tableName).toBe(`${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTables[0].columns).toHaveLength(3);
    expect(deleteTrackingTables[0].columns[0].name).toBe(pkColumnName);
    expect(deleteTrackingTables[0].columns[1].name).toBe('Id');
    expect(deleteTrackingTables[0].columns[2].name).toBe('SystemChangeVersion');
    expect(deleteTrackingTables[0].primaryKeyName).toBe(`PK_${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTables[0].primaryKeyColumns).toHaveLength(1);
    expect(deleteTrackingTables[0].primaryKeyColumns[0].name).toBe(pkColumnName);
  });

  it('should create delete tracking trigger', () => {
    const deleteTrackingTriggers = deleteTrackingTriggerEntities(metaEd, namespace);
    expect(deleteTrackingTriggers).toHaveLength(1);
    expect(deleteTrackingTriggers[0].triggerSchema).toBe(namespaceName);
    expect(deleteTrackingTriggers[0].triggerName).toBe(`${tableName}DeletedForTracking`);
    expect(deleteTrackingTriggers[0].targetTableSchema).toBe(namespaceName);
    expect(deleteTrackingTriggers[0].targetTableName).toBe(tableName);
    expect(deleteTrackingTriggers[0].deleteTrackingTableSchema).toBe('changes');
    expect(deleteTrackingTriggers[0].deleteTrackingTableName).toBe(`${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTriggers[0].primaryKeyColumnNames).toHaveLength(1);
    expect(deleteTrackingTriggers[0].primaryKeyColumnNames[0]).toBe(pkColumnName);
    expect(deleteTrackingTriggers[0].targetTableIsSubclass).toBe(false);
    expect(deleteTrackingTriggers[0].foreignKeyToSuperclass).toBeNull();
  });

  it('should create enable change tracking', () => {
    const enableChangeTracking = enableChangeTrackingEntities(metaEd, namespace);
    expect(enableChangeTracking).toHaveLength(1);
    expect(enableChangeTracking[0].schema).toBe(namespaceName);
    expect(enableChangeTracking[0].tableName).toBe(tableName);
  });
});
