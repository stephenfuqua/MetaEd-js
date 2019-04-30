import R from 'ramda';
import {
  addEntityForNamespace,
  newCommon,
  newCommonProperty,
  newDescriptor,
  newDescriptorProperty,
  newDomainEntity,
  newDomainEntityProperty,
  newEnumeration,
  newEnumerationProperty,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
  NoTopLevelEntity,
} from 'metaed-core';
import {
  Common,
  CommonProperty,
  Descriptor,
  DescriptorProperty,
  DomainEntity,
  DomainEntityProperty,
  Enumeration,
  EnumerationProperty,
  IntegerProperty,
  MetaEdEnvironment,
  TopLevelEntity,
  Namespace,
} from 'metaed-core';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import { enhance } from '../../../src/enhancer/table/DomainEntityTableEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';
import { ForeignKey } from '../../../src/model/database/ForeignKey';
import { Table } from '../../../src/model/database/Table';

describe('when DomainEntityTableEnhancer enhances entity with simple property', () => {
  const namespaceName = 'EdFi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';
  let entity: TopLevelEntity = NoTopLevelEntity;

  beforeAll(() => {
    entity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const property: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: propertyName,
      namespace,
      roleName: '',
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(property);

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(1);
    expect(tableEntities(metaEd, namespace).get(entityName)).toBeDefined();
  });

  it('should have schema equal to namespace', () => {
    expect((tableEntities(metaEd, namespace).get(entityName) as Table).schema).toBe(namespaceName.toLowerCase());
  });

  it('should have description equal to documentation', () => {
    expect((tableEntities(metaEd, namespace).get(entityName) as Table).description).toBe(documentation);
  });

  it('should have one column', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName) as Table;
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(propertyName);
  });

  it('should reference the original entity', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName) as Table;
    expect(table.parentEntity).toBe(entity);
  });
});

describe('when DomainEntityTableEnhancer enhances entity with required collection property', () => {
  const namespaceName = 'EdFi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const domainEntityName = 'DomainEntityName';
  const documentation = 'Documentation';
  const entityPkPropertyName = 'EntityPkPropertyName';
  const domainEntityPkPropertyName = 'DomainEntityPkPropertyName';

  beforeAll(() => {
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const entityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: entityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    const requiredCollectionProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: domainEntityName,
      roleName: '',
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: true,
        },
      },
    });
    entity.data.edfiOds.odsIdentityProperties.push(entityPkProperty);
    entity.data.edfiOds.odsProperties.push(entityPkProperty);
    entity.data.edfiOds.odsProperties.push(requiredCollectionProperty);

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: domainEntityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: domainEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkPropertyName,
      isPartOfIdentity: true,
      roleName: '',
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    domainEntity.data.edfiOds.odsIdentityProperties.push(domainEntityPkProperty);
    domainEntity.data.edfiOds.odsProperties.push(domainEntityPkProperty);
    requiredCollectionProperty.referencedEntity = domainEntity;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    addEntityForNamespace(domainEntity);
    enhance(metaEd);
  });

  it('should create three tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(3);
  });

  it('should create table for entity with one primary key column', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName) as Table;
    expect(table).toBeDefined();

    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(entityPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });

  it('should create table for domainEntity with one primary key column', () => {
    const table: Table = tableEntities(metaEd, namespace).get(domainEntityName) as Table;
    expect(table).toBeDefined();

    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(domainEntityPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });

  it('should create join table from entity and domainEntity', () => {
    expect(tableEntities(metaEd, namespace).get(entityName + domainEntityName)).toBeDefined();
  });

  it('should have join table with two columns', () => {
    expect((tableEntities(metaEd, namespace).get(entityName + domainEntityName) as Table).columns).toHaveLength(2);
  });

  it('should have join table with foreign key to entity', () => {
    const joinTable: Table = tableEntities(metaEd, namespace).get(entityName + domainEntityName) as Table;
    expect(joinTable.columns[0].name).toBe(entityPkPropertyName);
    expect(joinTable.columns[0].isPartOfPrimaryKey).toBe(true);
  });

  it('should have join table with foreign key to domainEntity', () => {
    const joinTable: Table = tableEntities(metaEd, namespace).get(entityName + domainEntityName) as Table;
    expect(joinTable.columns[1].name).toBe(domainEntityPkPropertyName);
    expect(joinTable.columns[1].isPartOfPrimaryKey).toBe(true);
  });
});

describe('when DomainEntityTableEnhancer enhances entity with required collection common property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const commonName = 'CommonName';
  const documentation = 'Documentation';
  const entityPkPropertyName = 'EntityPkPropertyName';
  const commonPkPropertyName = 'CommonPkPropertyName';

  beforeAll(() => {
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const entityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: entityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    const requiredCollectionProperty: CommonProperty = Object.assign(newCommonProperty(), {
      metaEdName: commonName,
      roleName: '',
      parentEntity: entity,
      data: {
        edfiOds: {
          odsName: commonName,
          odsContextPrefix: '',
          odsIsCollection: true,
        },
      },
    });
    entity.data.edfiOds.odsIdentityProperties.push(entityPkProperty);
    entity.data.edfiOds.odsProperties.push(entityPkProperty);
    entity.data.edfiOds.odsProperties.push(requiredCollectionProperty);

    const common: Common = Object.assign(newCommon(), {
      metaEdName: commonName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: commonName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkPropertyName,
      isPartOfIdentity: true,
      roleName: '',
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    common.data.edfiOds.odsIdentityProperties.push(commonPkProperty);
    common.data.edfiOds.odsProperties.push(commonPkProperty);
    requiredCollectionProperty.referencedEntity = common;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    addEntityForNamespace(common);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(2);
  });

  it('should create table for entity with one primary key column', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName) as Table;
    expect(table).toBeDefined();

    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(entityPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });

  it('should create join table from entity and domainEntity', () => {
    expect(tableEntities(metaEd, namespace).get(entityName + commonName)).toBeDefined();
  });

  it('should have join table with two columns', () => {
    expect((tableEntities(metaEd, namespace).get(entityName + commonName) as Table).columns).toHaveLength(2);
  });

  it('should have join table with foreign key to common', () => {
    const joinTable: Table = tableEntities(metaEd, namespace).get(entityName + commonName) as Table;
    expect(joinTable.columns[0].name).toBe(commonPkPropertyName);
    expect(joinTable.columns[0].isPartOfPrimaryKey).toBe(true);
  });

  it('should have join table with foreign key to entity', () => {
    const joinTable: Table = tableEntities(metaEd, namespace).get(entityName + commonName) as Table;
    expect(joinTable.columns[1].name).toBe(entityPkPropertyName);
    expect(joinTable.columns[1].isPartOfPrimaryKey).toBe(true);
  });
});

describe('when DomainEntityTableEnhancer enhances entity with primary key reference to another entity with a non primary key reference', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const entityPkPropertyName = 'EntityPkPropertyName';
  const referencedEntityName = 'ReferencedEntityName';
  const referencedEntityPkPropertyName = 'ReferencedEntityPkPropertyName';
  const subReferencedEntityName = 'SubReferencedEntityName';
  const subReferencedEntityPkPropertyName = 'SubReferencedEntityPkPropertyName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const entityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: entityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    const requiredProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: referencedEntityName,
      isRequired: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    entity.data.edfiOds.odsIdentityProperties.push(entityPkProperty);
    entity.data.edfiOds.odsProperties.push(entityPkProperty);
    entity.data.edfiOds.odsProperties.push(requiredProperty);

    const referencedEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: referencedEntityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: referencedEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const referencedEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: referencedEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: referencedEntity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    const referencedEntityRequiredProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: subReferencedEntityName,
      isRequired: true,
      parentEntity: referencedEntity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    referencedEntity.data.edfiOds.odsIdentityProperties.push(referencedEntityPkProperty);
    referencedEntity.data.edfiOds.odsProperties.push(referencedEntityPkProperty);
    referencedEntity.data.edfiOds.odsProperties.push(referencedEntityRequiredProperty);
    requiredProperty.referencedEntity = referencedEntity;

    const subReferencedEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: subReferencedEntityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: subReferencedEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const subReferencedEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: subReferencedEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: subReferencedEntity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    subReferencedEntity.data.edfiOds.odsIdentityProperties.push(subReferencedEntityPkProperty);
    subReferencedEntity.data.edfiOds.odsProperties.push(subReferencedEntityPkProperty);
    referencedEntityRequiredProperty.referencedEntity = subReferencedEntity;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    addEntityForNamespace(referencedEntity);
    addEntityForNamespace(subReferencedEntity);
    enhance(metaEd);
  });

  it('should create three tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(3);
  });

  it('should create table for entity with one primary key and one non primary key column', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName) as Table;
    expect(table).toBeDefined();

    expect(table.columns).toHaveLength(2);
    expect(table.columns[0].name).toBe(entityPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);

    expect(table.columns[1].name).toBe(referencedEntityPkPropertyName);
    expect(table.columns[1].isPartOfPrimaryKey).toBe(false);
  });

  it('should create table for referencedEntity with one primary key and one non primary key column', () => {
    const table: Table = tableEntities(metaEd, namespace).get(referencedEntityName) as Table;
    expect(table).toBeDefined();

    expect(table.columns).toHaveLength(2);
    expect(table.columns[0].name).toBe(referencedEntityPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);

    expect(table.columns[1].name).toBe(subReferencedEntityPkPropertyName);
    expect(table.columns[1].isPartOfPrimaryKey).toBe(false);
  });
});

describe('when DomainEntityTableEnhancer enhances entity with primary key reference to another entity with a primary key reference', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const entityPkPropertyName = 'EntityPkPropertyName';
  const referencedEntityName = 'ReferencedEntityName';
  const referencedEntityPkPropertyName = 'ReferencedEntityPkPropertyName';
  const subReferencedEntityName = 'SubReferencedEntityName';
  const subReferencedEntityPkPropertyName = 'SubReferencedEntityPkPropertyName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const entityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: entityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    const entityRequiredProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: referencedEntityName,
      isRequired: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    entity.data.edfiOds.odsIdentityProperties.push(entityPkProperty);
    entity.data.edfiOds.odsProperties.push(entityPkProperty);
    entity.data.edfiOds.odsProperties.push(entityRequiredProperty);

    const referencedEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: referencedEntityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: referencedEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const referencedEntityPkProperty1: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: referencedEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: referencedEntity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    const referencedEntityPkProperty2: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: subReferencedEntityName,
      isPartOfIdentity: true,
      parentEntity: referencedEntity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    referencedEntity.data.edfiOds.odsIdentityProperties.push(referencedEntityPkProperty1);
    referencedEntity.data.edfiOds.odsIdentityProperties.push(referencedEntityPkProperty2);
    referencedEntity.data.edfiOds.odsProperties.push(referencedEntityPkProperty1);
    referencedEntity.data.edfiOds.odsProperties.push(referencedEntityPkProperty2);
    entityRequiredProperty.referencedEntity = referencedEntity;

    const subReferencedEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: subReferencedEntityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: subReferencedEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const subReferencedEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: subReferencedEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: subReferencedEntity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    subReferencedEntity.data.edfiOds.odsIdentityProperties.push(subReferencedEntityPkProperty);
    subReferencedEntity.data.edfiOds.odsProperties.push(subReferencedEntityPkProperty);
    referencedEntityPkProperty2.referencedEntity = subReferencedEntity;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    addEntityForNamespace(referencedEntity);
    addEntityForNamespace(subReferencedEntity);
    enhance(metaEd);
  });

  it('should create three tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(3);
  });

  it('should create table for entity with one primary key and two non primary key columns', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName) as Table;
    expect(table).toBeDefined();

    expect(table.columns).toHaveLength(3);
    expect(table.columns[0].name).toBe(entityPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);

    expect(table.columns[1].name).toBe(referencedEntityPkPropertyName);
    expect(table.columns[1].isPartOfPrimaryKey).toBe(false);

    expect(table.columns[2].name).toBe(subReferencedEntityPkPropertyName);
    expect(table.columns[2].isPartOfPrimaryKey).toBe(false);
  });

  it('should create table for referencedEntity with two primary key columns', () => {
    const table: Table = tableEntities(metaEd, namespace).get(referencedEntityName) as Table;
    expect(table).toBeDefined();

    expect(table.columns).toHaveLength(2);
    expect(table.columns[0].name).toBe(referencedEntityPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);

    expect(table.columns[1].name).toBe(subReferencedEntityPkPropertyName);
    expect(table.columns[1].isPartOfPrimaryKey).toBe(true);
  });
});

describe("when DomainEntityTableEnhancer enhances entity with collection property whose name starts with the referenced entity's name", () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const referencedEntityName = 'EntityNameOfReference';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const entityCollectionProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: referencedEntityName,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: true,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(entityCollectionProperty);

    const referencedEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: referencedEntityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: referencedEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    entityCollectionProperty.referencedEntity = referencedEntity;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    addEntityForNamespace(referencedEntity);
    enhance(metaEd);
  });

  it('should create join table that does not conflict with the referenced entity table name', () => {
    expect(tableEntities(metaEd, namespace).get(entityName + referencedEntityName)).toBeDefined();
  });
});

describe('when DomainEntityTableEnhancer enhances entity with two reference properties that have same primary key names', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const referencedEntityName1 = 'ReferencedEntityName1';
  const referencedEntityName2 = 'ReferencedEntityName2';
  const commonPkPropertyName = 'CommonPkPropertyName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const entityPkProperty1: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: referencedEntityName1,
      isPartOfIdentity: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    const entityPkProperty2: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: referencedEntityName2,
      isPartOfIdentity: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    entity.data.edfiOds.odsIdentityProperties.push(entityPkProperty1);
    entity.data.edfiOds.odsIdentityProperties.push(entityPkProperty2);
    entity.data.edfiOds.odsProperties.push(entityPkProperty1);
    entity.data.edfiOds.odsProperties.push(entityPkProperty2);

    const referencedEntity1: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: referencedEntityName1,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: referencedEntityName1,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const referencedEntity1PkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: referencedEntity1,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    referencedEntity1.data.edfiOds.odsIdentityProperties.push(referencedEntity1PkProperty);
    referencedEntity1.data.edfiOds.odsProperties.push(referencedEntity1PkProperty);
    entityPkProperty1.referencedEntity = referencedEntity1;

    const referencedEntity2: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: referencedEntityName2,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: referencedEntityName2,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const referencedEntity2PkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: referencedEntity2,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    referencedEntity2.data.edfiOds.odsIdentityProperties.push(referencedEntity2PkProperty);
    referencedEntity2.data.edfiOds.odsProperties.push(referencedEntity2PkProperty);
    entityPkProperty2.referencedEntity = referencedEntity2;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    addEntityForNamespace(referencedEntity1);
    addEntityForNamespace(referencedEntity2);
    enhance(metaEd);
  });

  it('should create three tables, one for each entity', () => {
    expect(tableEntities(metaEd, namespace).get(entityName)).toBeDefined();
    expect(tableEntities(metaEd, namespace).get(referencedEntityName1)).toBeDefined();
    expect(tableEntities(metaEd, namespace).get(referencedEntityName2)).toBeDefined();
  });
  it('should create single column in entity table', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName) as Table;
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(commonPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });
});

describe('when DomainEntityTableEnhancer enhances entity with optional collection property role name', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const contextName = 'ContextName';
  const entityName = 'EntityName';
  const optionalCollectionPropertyName = 'OptionalCollectionPropertyName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const optionalCollectionProperty: EnumerationProperty = Object.assign(newEnumerationProperty(), {
      metaEdName: optionalCollectionPropertyName,
      isOptionalCollection: true,
      roleName: contextName,
      parentEntity: entity,
      referencedEntity: Object.assign(newEnumeration(), {
        data: {
          edfiOds: {
            odsTableName: 'EnumerationEntityName',
          },
        },
      }),
      data: {
        edfiOds: {
          odsTypeifiedBaseName: `${optionalCollectionPropertyName}Type`,
          odsContextPrefix: contextName,
          odsIsCollection: true,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(optionalCollectionProperty);

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(2);
  });

  it('should have entity table', () => {
    expect(tableEntities(metaEd, namespace).get(entityName)).toBeDefined();
  });

  it('should have join table role name', () => {
    expect(tableEntities(metaEd, namespace).get(entityName + contextName + optionalCollectionPropertyName)).toBeDefined();
  });
});

describe('when DomainEntityTableEnhancer enhances entity with collection enumeration property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const enumerationName = 'EnumerationName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsName: entityName,
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const enumerationProperty: EnumerationProperty = Object.assign(newEnumerationProperty(), {
      metaEdName: enumerationName,
      isOptionalCollection: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsTypeifiedBaseName: `${enumerationName}Type`,
          odsContextPrefix: '',
          odsIsCollection: true,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(enumerationProperty);

    const enumeration: Enumeration = Object.assign(newEnumeration(), {
      metaEdName: enumerationName,
      data: {
        edfiOds: {
          odsTableName: `${enumerationName}Type`,
        },
      },
    });
    enumerationProperty.referencedEntity = enumeration;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(2);
  });

  it('should have entity table', () => {
    expect(tableEntities(metaEd, namespace).get(entityName)).toBeDefined();
  });

  it('should have join table', () => {
    expect(tableEntities(metaEd, namespace).get(entityName + enumerationName)).toBeDefined();
  });

  it('should have join table with foreign key to enumeration table', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName + enumerationName) as Table;
    const foreignKey: ForeignKey = R.head(table.foreignKeys.filter(x => x.foreignTableName !== entityName));
    expect(foreignKey).toBeDefined();
    expect(foreignKey.foreignTableName).toBe(`${enumerationName}Type`);
  });
});

describe('when DomainEntityTableEnhancer enhances entity with enumeration property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const enumerationName = 'EnumerationName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsName: entityName,
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const enumerationProperty: EnumerationProperty = Object.assign(newEnumerationProperty(), {
      metaEdName: enumerationName,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsTypeifiedBaseName: `${enumerationName}Type`,
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(enumerationProperty);

    const enumeration: Enumeration = Object.assign(newEnumeration(), {
      metaEdName: enumerationName,
      data: {
        edfiOds: {
          odsTableName: `${enumerationName}Type`,
        },
      },
    });
    enumerationProperty.referencedEntity = enumeration;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    enhance(metaEd);
  });

  it('should create one table', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(1);
  });

  it('should have foreign key to enumeration table', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName) as Table;
    const foreignKey: ForeignKey = R.head(table.foreignKeys);
    expect(foreignKey).toBeDefined();
    expect(foreignKey.foreignTableName).toBe(`${enumerationName}Type`);
  });
});

describe("when DomainEntityTableEnhancer enhances entity with enumeration property whose name starts with the parent entity's name", () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const enumerationName = 'EntityNameForEnumeration';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsName: entityName,
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const enumerationProperty: EnumerationProperty = Object.assign(newEnumerationProperty(), {
      metaEdName: enumerationName,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsTypeifiedBaseName: `${enumerationName}Type`,
          odsContextPrefix: '',
          odsIsCollection: true,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(enumerationProperty);

    const enumeration: Enumeration = Object.assign(newEnumeration(), {
      metaEdName: enumerationName,
      data: {
        edfiOds: {
          odsTableName: `${enumerationName}Type`,
        },
      },
    });
    enumerationProperty.referencedEntity = enumeration;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(2);
  });

  it('should have entity table', () => {
    expect(tableEntities(metaEd, namespace).get(entityName)).toBeDefined();
  });

  it('should create join table that does not conflict with the parent entity table name', () => {
    expect(tableEntities(metaEd, namespace).get(enumerationName)).toBeDefined();
  });
});

describe('when DomainEntityTableEnhancer enhances entity with descriptor collection property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const descriptorName = 'DescriptorName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsName: entityName,
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const descriptorProperty: DescriptorProperty = Object.assign(newDescriptorProperty(), {
      metaEdName: descriptorName,
      isOptionalCollection: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsDescriptorifiedBaseName: `${descriptorName}Descriptor`,
          odsContextPrefix: '',
          odsIsCollection: true,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(descriptorProperty);

    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorName,
      data: {
        edfiOds: {
          odsDescriptorName: `${descriptorName}Descriptor`,
          odsTableName: `${descriptorName}Descriptor`,
        },
      },
    });
    descriptorProperty.referencedEntity = descriptor;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(2);
  });

  it('should have entity table', () => {
    expect(tableEntities(metaEd, namespace).get(entityName)).toBeDefined();
  });

  it('should have join table', () => {
    expect(tableEntities(metaEd, namespace).get(entityName + descriptorName)).toBeDefined();
  });

  it('should have join table with foreign key to descriptor table', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName + descriptorName) as Table;
    const foreignKey: ForeignKey = R.head(table.foreignKeys.filter(x => x.foreignTableName !== entityName));
    expect(foreignKey).toBeDefined();
    expect(foreignKey.foreignTableName).toBe(`${descriptorName}Descriptor`);
  });
});

describe('when DomainEntityTableEnhancer enhances entity with descriptor property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const descriptorName = 'DescriptorName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsName: entityName,
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const descriptorProperty: DescriptorProperty = Object.assign(newDescriptorProperty(), {
      metaEdName: descriptorName,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsDescriptorifiedBaseName: `${descriptorName}Descriptor`,
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(descriptorProperty);

    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorName,
      data: {
        edfiOds: {
          odsDescriptorName: `${descriptorName}Descriptor`,
          odsTableName: `${descriptorName}Type`,
        },
      },
    });
    descriptorProperty.referencedEntity = descriptor;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    enhance(metaEd);
  });

  it('should create one table', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(1);
  });

  it('should have foreign key to descriptor table', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName) as Table;
    const foreignKey: ForeignKey = R.head(table.foreignKeys);
    expect(foreignKey).toBeDefined();
    expect(foreignKey.foreignTableName).toBe(`${descriptorName}Descriptor`);
  });
});

describe("when DomainEntityTableEnhancer enhances entity with descriptor collection property whose name starts with the parent entity's name", () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const descriptorName = 'EntityNameForDescriptor';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsName: entityName,
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const descriptorProperty: DescriptorProperty = Object.assign(newDescriptorProperty(), {
      metaEdName: descriptorName,
      isOptionalCollection: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsDescriptorifiedBaseName: `${descriptorName}Descriptor`,
          odsContextPrefix: '',
          odsIsCollection: true,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(descriptorProperty);

    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorName,
      data: {
        edfiOds: {
          odsDescriptorName: `${descriptorName}Descriptor`,
          odsTableName: `${descriptorName}Descriptor`,
        },
      },
    });
    descriptorProperty.referencedEntity = descriptor;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(2);
  });

  it('should have entity table', () => {
    expect(tableEntities(metaEd, namespace).get(entityName)).toBeDefined();
  });

  it('should create join table that does not conflict with the parent entity table name', () => {
    expect(tableEntities(metaEd, namespace).get(descriptorName)).toBeDefined();
  });
});

describe("when DomainEntityTableEnhancer enhances entity with common collection property whose name starts with the parent entity's name", () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const entityPkPropertyName = 'EntityPkPropertyName';
  const commonName = 'EntityNameForCommon';
  const commonPkPropertyName = 'CommonPkPropertyName';
  const commonNonPkPropertyName = 'CommonNonPkPropertyName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: entityName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsName: entityName,
          odsTableName: entityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const entityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: entityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    const commonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      metaEdName: commonName,
      isOptionalCollection: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsName: commonName,
          odsContextPrefix: '',
          odsIsCollection: true,
        },
      },
    });
    entity.data.edfiOds.odsIdentityProperties.push(entityPkProperty);
    entity.data.edfiOds.odsProperties.push(entityPkProperty);
    entity.data.edfiOds.odsProperties.push(commonProperty);

    const common: Common = Object.assign(newCommon(), {
      metaEdName: commonName,
      data: {
        edfiOds: {
          odsTableName: commonName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    const commonNonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonNonPkPropertyName,
      isPartOfIdentity: false,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    common.data.edfiOds.odsIdentityProperties.push(commonPkProperty);
    common.data.edfiOds.odsProperties.push(commonPkProperty);
    common.data.edfiOds.odsProperties.push(commonNonPkProperty);
    commonProperty.referencedEntity = common;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, namespace).size).toBe(2);
  });

  it('should have entity table with one primary key', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName) as Table;
    expect(table).toBeDefined();

    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(entityPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });

  it('should create join table with two primary keys and one non primary key', () => {
    const table: Table = tableEntities(metaEd, namespace).get(commonName) as Table;
    expect(table).toBeDefined();

    expect(table.columns).toHaveLength(3);
    expect(table.columns[0].name).toBe(commonPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);

    expect(table.columns[1].name).toBe(commonNonPkPropertyName);
    expect(table.columns[1].isPartOfPrimaryKey).toBe(false);

    expect(table.columns[2].name).toBe(entityPkPropertyName);
    expect(table.columns[2].isPartOfPrimaryKey).toBe(true);
  });
});
