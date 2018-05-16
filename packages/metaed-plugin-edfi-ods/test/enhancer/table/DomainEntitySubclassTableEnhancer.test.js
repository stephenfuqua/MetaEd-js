// @flow
import R from 'ramda';
import {
  addEntityForNamespace,
  newDomainEntity,
  newDomainEntitySubclass,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import type { DomainEntity, DomainEntitySubclass, IntegerProperty, MetaEdEnvironment, Namespace } from 'metaed-core';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import { enhance } from '../../../src/enhancer/table/DomainEntitySubclassTableEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';
import type { Table } from '../../../src/model/database/Table';

describe('when DomainEntitySubclassTableEnhancer enhances domain entity subclass', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const documentation: string = 'Documentation';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  const domainEntitySubclassPropertyName: string = 'DomainEntitySubclassPropertyName';

  beforeAll(() => {
    const domainEntityName: string = 'DomainEntityName';
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      documentation,
      metaEdName: domainEntityName,
      data: {
        edfiOds: {
          ods_TableName: domainEntityName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const domainEntityPkPropertyName: string = 'DomainEntityPkPropertyName';
    const domainEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntity,
      data: {
        edfiOds: {
          ods_Name: domainEntityPkPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    domainEntity.data.edfiOds.ods_Properties.push(domainEntityPkProperty);
    addEntityForNamespace(domainEntity);

    const domainEntitySubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      namespace: extensionNamespace,
      documentation,
      metaEdName: domainEntitySubclassName,
      baseEntityName: domainEntityName,
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          ods_TableName: domainEntitySubclassName,
          ods_ExtensionName: domainEntitySubclassName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const domainEntitySubclassProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: domainEntitySubclassPropertyName,
      isPartOfIdentity: false,
      parentEntity: domainEntitySubclass,
      data: {
        edfiOds: {
          ods_Name: domainEntitySubclassPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    domainEntitySubclass.data.edfiOds.ods_Properties.push(domainEntitySubclassProperty);
    addEntityForNamespace(domainEntitySubclass);

    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntitySubclassName)).toBeDefined();
  });

  it('should have schema equal to namespace', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntitySubclassName).schema).toBe('extension');
  });

  it('should have description equal to documentation', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntitySubclassName).description).toBe(documentation);
  });

  it('should have one column', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(domainEntitySubclassName);
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(domainEntitySubclassPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(false);
  });
});

describe('when DomainEntitySubclassTableEnhancer enhances domain entity subclass with primary key', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const documentation: string = 'Documentation';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  const domainEntitySubclassPkPropertyName: string = 'DomainEntitySubclassPkPropertyName';

  beforeAll(() => {
    const domainEntityName: string = 'DomainEntityName';
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      documentation,
      metaEdName: domainEntityName,
      data: {
        edfiOds: {
          ods_TableName: domainEntityName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const domainEntityPkPropertyName: string = 'DomainEntityPkPropertyName';
    const domainEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntity,
      data: {
        edfiOds: {
          ods_Name: domainEntityPkPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    domainEntity.data.edfiOds.ods_Properties.push(domainEntityPkProperty);
    addEntityForNamespace(domainEntity);

    const domainEntitySubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      namespace: extensionNamespace,
      documentation,
      metaEdName: domainEntitySubclassName,
      baseEntityName: domainEntityName,
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          ods_TableName: domainEntitySubclassName,
          ods_ExtensionName: domainEntitySubclassName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const domainEntitySubclassPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: domainEntitySubclassPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntitySubclass,
      data: {
        edfiOds: {
          ods_Name: domainEntitySubclassPkPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    domainEntitySubclass.data.edfiOds.ods_Properties.push(domainEntitySubclassPkProperty);
    addEntityForNamespace(domainEntitySubclass);

    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntitySubclassName)).toBeDefined();
  });

  it('should have one primary key column', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(domainEntitySubclassName);
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(domainEntitySubclassPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });
});

describe('when DomainEntitySubclassTableEnhancer enhances domain entity subclass with identity rename property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const documentation: string = 'Documentation';
  const domainEntityName: string = 'DomainEntityName';
  const domainEntitySubclassName: string = 'DomainEntitySubclassName';
  const domainEntitySubclassRenamePropertyName: string = 'DomainEntitySubclassRenamePropertyName';

  const domainEntityPkPropertyName: string = 'DomainEntityPkPropertyName';
  beforeAll(() => {
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      documentation,
      metaEdName: domainEntityName,
      data: {
        edfiOds: {
          ods_TableName: domainEntityName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const domainEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntity,
      data: {
        edfiOds: {
          ods_Name: domainEntityPkPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    domainEntity.data.edfiOds.ods_Properties.push(domainEntityPkProperty);
    addEntityForNamespace(domainEntity);

    const domainEntitySubclass: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      namespace: extensionNamespace,
      documentation,
      metaEdName: domainEntitySubclassName,
      baseEntityName: domainEntityName,
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          ods_TableName: domainEntitySubclassName,
          ods_ExtensionName: domainEntitySubclassName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const domainEntitySubclassRenameProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: domainEntitySubclassRenamePropertyName,
      isIdentityRename: true,
      baseKeyName: domainEntityPkPropertyName,
      parentEntity: domainEntitySubclass,
      data: {
        edfiOds: {
          ods_Name: domainEntitySubclassRenamePropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    domainEntitySubclass.data.edfiOds.ods_Properties.push(domainEntitySubclassRenameProperty);
    addEntityForNamespace(domainEntitySubclass);

    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntitySubclassName)).toBeDefined();
  });

  it('should have one column', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(domainEntitySubclassName);
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(domainEntitySubclassRenamePropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(false);
  });

  it('should create foreign key to from identity rename property to base entity property', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(domainEntitySubclassName);
    expect(table.foreignKeys).toHaveLength(1);
    expect(R.head(table.foreignKeys).parentTableName).toBe(domainEntitySubclassName);
    expect(R.head(table.foreignKeys).foreignTableName).toBe(domainEntityName);
  });
});
