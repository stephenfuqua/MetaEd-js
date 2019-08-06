import { newDescriptor } from 'metaed-core';
import { MetaEdEnvironment, Descriptor, Namespace } from 'metaed-core';
import { newTable, newColumn, newForeignKey, newForeignKeySourceReference } from 'metaed-plugin-edfi-ods-relational';
import { addEdFiOdsChangeQueryEntityRepositoryTo } from '../../src/model/EdFiOdsChangeQueryEntityRepository';
import { enhance } from '../../src/enhancer/DescriptorChangeQueryEnhancer';
import { metaEdEnvironmentForApiVersion, newCoreNamespace, newExtensionNamespace } from './TestHelper';
import { deleteTrackingTableEntities, deleteTrackingTriggerEntities } from '../../src/enhancer/EnhancerHelper';

describe('when enhancing core descriptor targeting 2.3 ODS/API', (): void => {
  const namespaceName = 'EdFi';
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const pkColumnName = 'PkColumnName';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('2.3.0');
  const namespace: Namespace = newCoreNamespace();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeQueryEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName,
      namespace,
      data: {
        edfiOdsRelational: {
          odsEntityTable: {
            ...newTable(),
            name: tableName,
            nameComponents: [tableName],
            data: { edfiOdsSqlServer: { tableName } },
            schema: namespaceName,
            columns: [
              { ...newColumn(), data: { edfiOdsSqlServer: { columnName: pkColumnName } }, isPartOfPrimaryKey: true },
            ],
            foreignKeys: [
              {
                ...newForeignKey(),
                sourceReference: { ...newForeignKeySourceReference(), isSubclassRelationship: true },
                data: { edfiOdsSqlServer: { parentTableColumnNames: [], foreignTableColumnNames: [] } },
              },
            ],
          },
        },
      },
    });
    namespace.entity.descriptor.set(descriptor.metaEdName, descriptor);

    enhance(metaEd);
  });

  it('should not create delete tracking table', (): void => {
    const deleteTrackingTables = deleteTrackingTableEntities(metaEd, namespace);
    expect(deleteTrackingTables).toHaveLength(0);
  });

  it('should not create delete tracking trigger', (): void => {
    const deleteTrackingTriggers = deleteTrackingTriggerEntities(metaEd, namespace);
    expect(deleteTrackingTriggers).toHaveLength(0);
  });
});

describe('when enhancing core descriptor targeting 2.5 ODS/API', (): void => {
  const namespaceName = 'EdFi';
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const pkColumnName = 'PkColumnName';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('2.5.0');
  const namespace: Namespace = newCoreNamespace();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeQueryEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName,
      namespace,
      data: {
        edfiOdsRelational: {
          odsEntityTable: {
            ...newTable(),
            name: tableName,
            nameComponents: [tableName],
            data: { edfiOdsSqlServer: { tableName } },
            schema: namespaceName,
            columns: [
              { ...newColumn(), data: { edfiOdsSqlServer: { columnName: pkColumnName } }, isPartOfPrimaryKey: true },
            ],
            foreignKeys: [
              {
                ...newForeignKey(),
                sourceReference: { ...newForeignKeySourceReference(), isSubclassRelationship: true },
                data: { edfiOdsSqlServer: { parentTableColumnNames: [], foreignTableColumnNames: [] } },
              },
            ],
          },
        },
      },
    });
    namespace.entity.descriptor.set(descriptor.metaEdName, descriptor);

    enhance(metaEd);
  });

  it('should not create delete tracking table', (): void => {
    const deleteTrackingTables = deleteTrackingTableEntities(metaEd, namespace);
    expect(deleteTrackingTables).toHaveLength(0);
  });

  it('should not create delete tracking trigger', (): void => {
    const deleteTrackingTriggers = deleteTrackingTriggerEntities(metaEd, namespace);
    expect(deleteTrackingTriggers).toHaveLength(0);
  });
});

describe('when enhancing extension descriptor targeting 2.5 ODS/API', (): void => {
  const namespaceName = 'Extension';
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const pkColumnName = 'PkColumnName';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('2.5.0');
  const namespace: Namespace = newExtensionNamespace(namespaceName);
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeQueryEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName,
      namespace,
      data: {
        edfiOdsRelational: {
          odsEntityTable: {
            ...newTable(),
            name: tableName,
            nameComponents: [tableName],
            data: { edfiOdsSqlServer: { tableName } },
            schema: namespaceName,
            columns: [
              { ...newColumn(), data: { edfiOdsSqlServer: { columnName: pkColumnName } }, isPartOfPrimaryKey: true },
            ],
            foreignKeys: [
              {
                ...newForeignKey(),
                sourceReference: { ...newForeignKeySourceReference(), isSubclassRelationship: true },
                data: { edfiOdsSqlServer: { parentTableColumnNames: [], foreignTableColumnNames: [] } },
              },
            ],
          },
        },
      },
    });
    namespace.entity.descriptor.set(descriptor.metaEdName, descriptor);

    enhance(metaEd);
  });

  it('should not create delete tracking table', (): void => {
    const deleteTrackingTables = deleteTrackingTableEntities(metaEd, namespace);
    expect(deleteTrackingTables).toHaveLength(0);
  });

  it('should not create delete tracking trigger', (): void => {
    const deleteTrackingTriggers = deleteTrackingTriggerEntities(metaEd, namespace);
    expect(deleteTrackingTriggers).toHaveLength(0);
  });
});

describe('when enhancing core descriptor targeting 3.1 ODS/API', (): void => {
  const namespaceName = 'EdFi';
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const pkColumnName = 'PkColumnName';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('3.1.0');
  const namespace: Namespace = newCoreNamespace();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeQueryEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName,
      namespace,
      data: {
        edfiOdsRelational: {
          odsEntityTable: {
            ...newTable(),
            name: tableName,
            nameComponents: [tableName],
            data: { edfiOdsSqlServer: { tableName } },
            schema: namespaceName,
            columns: [
              { ...newColumn(), data: { edfiOdsSqlServer: { columnName: pkColumnName } }, isPartOfPrimaryKey: true },
            ],
            foreignKeys: [
              {
                ...newForeignKey(),
                sourceReference: { ...newForeignKeySourceReference(), isSubclassRelationship: true },
                data: { edfiOdsSqlServer: { parentTableColumnNames: [], foreignTableColumnNames: [] } },
              },
            ],
          },
        },
      },
    });
    namespace.entity.descriptor.set(descriptor.metaEdName, descriptor);

    enhance(metaEd);
  });

  it('should create delete tracking table', (): void => {
    const deleteTrackingTables = deleteTrackingTableEntities(metaEd, namespace);
    expect(deleteTrackingTables).toHaveLength(1);
    expect(deleteTrackingTables[0].schema).toBe('changes');
    expect(deleteTrackingTables[0].tableName).toBe(`${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTables[0].columns).toHaveLength(3);
    expect(deleteTrackingTables[0].columns[0].data.edfiOdsSqlServer.columnName).toBe(pkColumnName);
    expect(deleteTrackingTables[0].columns[1].data.edfiOdsSqlServer.columnName).toBe('Id');
    expect(deleteTrackingTables[0].columns[2].data.edfiOdsSqlServer.columnName).toBe('ChangeVersion');
    expect(deleteTrackingTables[0].primaryKeyName).toBe(`PK_${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTables[0].primaryKeyColumns).toHaveLength(1);
    expect(deleteTrackingTables[0].primaryKeyColumns[0].data.edfiOdsSqlServer.columnName).toBe('ChangeVersion');
  });

  it('should create delete tracking trigger', (): void => {
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
    expect(deleteTrackingTriggers[0].targetTableIsSubclass).toBe(true);
    expect(deleteTrackingTriggers[0].foreignKeyToSuperclass).not.toBeNull();
  });
});

describe('when enhancing extension descriptor targeting 3.1 ODS/API', (): void => {
  const namespaceName = 'Extension';
  const metaEdName = 'MetaEdName';
  const tableName = 'TableName';
  const pkColumnName = 'PkColumnName';

  const metaEd: MetaEdEnvironment = metaEdEnvironmentForApiVersion('3.1.0');
  const namespace: Namespace = newExtensionNamespace(namespaceName);
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiOdsChangeQueryEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName,
      namespace,
      data: {
        edfiOdsRelational: {
          odsEntityTable: {
            ...newTable(),
            name: tableName,
            nameComponents: [tableName],
            data: { edfiOdsSqlServer: { tableName } },
            schema: namespaceName,
            columns: [
              { ...newColumn(), data: { edfiOdsSqlServer: { columnName: pkColumnName } }, isPartOfPrimaryKey: true },
            ],
            foreignKeys: [
              {
                ...newForeignKey(),
                sourceReference: { ...newForeignKeySourceReference(), isSubclassRelationship: true },
                data: { edfiOdsSqlServer: { parentTableColumnNames: [], foreignTableColumnNames: [] } },
              },
            ],
          },
        },
      },
    });
    namespace.entity.descriptor.set(descriptor.metaEdName, descriptor);

    enhance(metaEd);
  });

  it('should create delete tracking table', (): void => {
    const deleteTrackingTables = deleteTrackingTableEntities(metaEd, namespace);
    expect(deleteTrackingTables).toHaveLength(1);
    expect(deleteTrackingTables[0].schema).toBe('changes');
    expect(deleteTrackingTables[0].tableName).toBe(`${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTables[0].columns).toHaveLength(3);
    expect(deleteTrackingTables[0].columns[0].data.edfiOdsSqlServer.columnName).toBe(pkColumnName);
    expect(deleteTrackingTables[0].columns[1].data.edfiOdsSqlServer.columnName).toBe('Id');
    expect(deleteTrackingTables[0].columns[2].data.edfiOdsSqlServer.columnName).toBe('ChangeVersion');
    expect(deleteTrackingTables[0].primaryKeyName).toBe(`PK_${namespaceName}_${tableName}_TrackedDelete`);
    expect(deleteTrackingTables[0].primaryKeyColumns).toHaveLength(1);
    expect(deleteTrackingTables[0].primaryKeyColumns[0].data.edfiOdsSqlServer.columnName).toBe('ChangeVersion');
  });

  it('should create delete tracking trigger', (): void => {
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
    expect(deleteTrackingTriggers[0].targetTableIsSubclass).toBe(true);
    expect(deleteTrackingTriggers[0].foreignKeyToSuperclass).not.toBeNull();
  });
});
