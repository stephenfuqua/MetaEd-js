import { newDomainEntity } from 'metaed-core';
import { MetaEdEnvironment, DomainEntity, Namespace } from 'metaed-core';
import { newTable, newColumn } from 'metaed-plugin-edfi-ods';
import { addEdFiOdsChangeQueryEntityRepositoryTo } from '../../src/model/EdFiOdsChangeQueryEntityRepository';
import { enhance } from '../../src/enhancer/DomainEntityChangeQueryEnhancer';
import { metaEdEnvironmentForApiVersion, newCoreNamespace, newExtensionNamespace } from './TestHelper';
import { deleteTrackingTableEntities, deleteTrackingTriggerEntities } from '../../src/enhancer/EnhancerHelper';

describe('when enhancing core domainEntity targeting 2.3 ODS/API', () => {
  const namespaceName = 'edfi';
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const pkColumnName = 'PkColumnName';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('2.3.0');
  const namespace: Namespace = newCoreNamespace();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeQueryEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName,
      namespace,
      data: {
        edfiOds: {
          odsEntityTable: {
            ...newTable(),
            name: tableName,
            schema: namespaceName,
            columns: [{ ...newColumn(), name: pkColumnName, isPartOfPrimaryKey: true }],
          },
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

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
});

describe('when enhancing core domainEntity targeting 2.5 ODS/API', () => {
  const namespaceName = 'edfi';
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const pkColumnName = 'PkColumnName';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('2.5.0');
  const namespace: Namespace = newCoreNamespace();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeQueryEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName,
      namespace,
      data: {
        edfiOds: {
          odsEntityTable: {
            ...newTable(),
            name: tableName,
            schema: namespaceName,
            columns: [{ ...newColumn(), name: pkColumnName, isPartOfPrimaryKey: true }],
          },
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

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
});

describe('when enhancing extension domainEntity targeting 2.5 ODS/API', () => {
  const namespaceName = 'extension';
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const pkColumnName = 'PkColumnName';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('2.5.0');
  const namespace: Namespace = newExtensionNamespace(namespaceName);
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeQueryEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName,
      namespace,
      data: {
        edfiOds: {
          odsEntityTable: {
            ...newTable(),
            name: tableName,
            schema: namespaceName,
            columns: [{ ...newColumn(), name: pkColumnName, isPartOfPrimaryKey: true }],
          },
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

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
});

describe('when enhancing core domainEntity targeting 3.1 ODS/API', () => {
  const namespaceName = 'edfi';
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const pkColumnName = 'PkColumnName';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('3.1.0');
  const namespace: Namespace = newCoreNamespace();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeQueryEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName,
      namespace,
      data: {
        edfiOds: {
          odsEntityTable: {
            ...newTable(),
            name: tableName,
            schema: namespaceName,
            columns: [{ ...newColumn(), name: pkColumnName, isPartOfPrimaryKey: true }],
          },
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

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
    expect(deleteTrackingTables[0].columns[2].name).toBe('ChangeVersion');
    expect(deleteTrackingTables[0].primaryKeyName).toBe(`PK_${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTables[0].primaryKeyColumns).toHaveLength(1);
    expect(deleteTrackingTables[0].primaryKeyColumns[0].name).toBe('ChangeVersion');
  });

  it('should create delete tracking trigger', () => {
    const deleteTrackingTriggers = deleteTrackingTriggerEntities(metaEd, namespace);
    expect(deleteTrackingTriggers).toHaveLength(1);
    expect(deleteTrackingTriggers[0].triggerSchema).toBe(namespaceName);
    expect(deleteTrackingTriggers[0].triggerName).toBe(`${namespaceName}_${tableName}_TR_DeleteTracking`);
    expect(deleteTrackingTriggers[0].targetTableSchema).toBe(namespaceName);
    expect(deleteTrackingTriggers[0].targetTableName).toBe(tableName);
    expect(deleteTrackingTriggers[0].deleteTrackingTableSchema).toBe('changes');
    expect(deleteTrackingTriggers[0].deleteTrackingTableName).toBe(`${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTriggers[0].primaryKeyColumnNames).toHaveLength(1);
    expect(deleteTrackingTriggers[0].primaryKeyColumnNames[0]).toBe(pkColumnName);
    expect(deleteTrackingTriggers[0].targetTableIsSubclass).toBe(false);
    expect(deleteTrackingTriggers[0].foreignKeyToSuperclass).toBeNull();
  });
});

describe('when enhancing extension domainEntity targeting 3.1 ODS/API', () => {
  const namespaceName = 'extension';
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const pkColumnName = 'PkColumnName';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('3.1.0');
  const namespace: Namespace = newExtensionNamespace(namespaceName);
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeQueryEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName,
      namespace,
      data: {
        edfiOds: {
          odsEntityTable: {
            ...newTable(),
            name: tableName,
            schema: namespaceName,
            columns: [{ ...newColumn(), name: pkColumnName, isPartOfPrimaryKey: true }],
          },
        },
      },
    });
    namespace.entity.domainEntity.set(domainEntity.metaEdName, domainEntity);

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
    expect(deleteTrackingTables[0].columns[2].name).toBe('ChangeVersion');
    expect(deleteTrackingTables[0].primaryKeyName).toBe(`PK_${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTables[0].primaryKeyColumns).toHaveLength(1);
    expect(deleteTrackingTables[0].primaryKeyColumns[0].name).toBe('ChangeVersion');
  });

  it('should create delete tracking trigger', () => {
    const deleteTrackingTriggers = deleteTrackingTriggerEntities(metaEd, namespace);
    expect(deleteTrackingTriggers).toHaveLength(1);
    expect(deleteTrackingTriggers[0].triggerSchema).toBe(namespaceName);
    expect(deleteTrackingTriggers[0].triggerName).toBe(`${namespaceName}_${tableName}_TR_DeleteTracking`);
    expect(deleteTrackingTriggers[0].targetTableSchema).toBe(namespaceName);
    expect(deleteTrackingTriggers[0].targetTableName).toBe(tableName);
    expect(deleteTrackingTriggers[0].deleteTrackingTableSchema).toBe('changes');
    expect(deleteTrackingTriggers[0].deleteTrackingTableName).toBe(`${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTriggers[0].primaryKeyColumnNames).toHaveLength(1);
    expect(deleteTrackingTriggers[0].primaryKeyColumnNames[0]).toBe(pkColumnName);
    expect(deleteTrackingTriggers[0].targetTableIsSubclass).toBe(false);
    expect(deleteTrackingTriggers[0].foreignKeyToSuperclass).toBeNull();
  });
});
