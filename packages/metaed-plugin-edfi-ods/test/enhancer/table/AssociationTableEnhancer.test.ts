import R from 'ramda';
import {
  addEntityForNamespace,
  newCommon,
  newCommonProperty,
  newDescriptor,
  newDescriptorProperty,
  newAssociation,
  newAssociationProperty,
  newEnumeration,
  newEnumerationProperty,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import {
  Association,
  AssociationProperty,
  Common,
  CommonProperty,
  Descriptor,
  DescriptorProperty,
  Enumeration,
  EnumerationProperty,
  IntegerProperty,
  MetaEdEnvironment,
  Namespace,
} from 'metaed-core';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import { enhance } from '../../../src/enhancer/table/AssociationTableEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';
import { ForeignKey } from '../../../src/model/database/ForeignKey';
import { Table } from '../../../src/model/database/Table';

describe('when AssociationTableEnhancer enhances entity with simple property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const documentation = 'Documentation';
  const propertyName = 'PropertyName';

  beforeAll(() => {
    const entity: Association = Object.assign(newAssociation(), {
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
      withContext: '',
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
    expect((tableEntities(metaEd, namespace).get(entityName) as Table).schema).toBe('edfi');
  });

  it('should have description equal to documentation', () => {
    expect((tableEntities(metaEd, namespace).get(entityName) as Table).description).toBe(documentation);
  });

  it('should have one column', () => {
    const table: Table = tableEntities(metaEd, namespace).get(entityName) as Table;
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(propertyName);
  });
});

describe('when AssociationTableEnhancer enhances entity with required collection property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const associationName = 'AssociationName';
  const documentation = 'Documentation';
  const entityPkPropertyName = 'EntityPkPropertyName';
  const associationPkPropertyName = 'AssociationPkPropertyName';

  beforeAll(() => {
    const entity: Association = Object.assign(newAssociation(), {
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
    const requiredCollectionProperty: AssociationProperty = Object.assign(newAssociationProperty(), {
      metaEdName: associationName,
      referencedNamespaceName: namespace.namespaceName,
      withContext: '',
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

    const association: Association = Object.assign(newAssociation(), {
      metaEdName: associationName,
      documentation,
      namespace,
      data: {
        edfiOds: {
          odsTableName: associationName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const associationPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: associationPkPropertyName,
      isPartOfIdentity: true,
      withContext: '',
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    association.data.edfiOds.odsIdentityProperties.push(associationPkProperty);
    association.data.edfiOds.odsProperties.push(associationPkProperty);
    requiredCollectionProperty.referencedEntity = association;

    initializeEdFiOdsEntityRepository(metaEd);
    addEntityForNamespace(entity);
    addEntityForNamespace(association);
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

  it('should create table for association with one primary key column', () => {
    const table: Table = tableEntities(metaEd, namespace).get(associationName) as Table;
    expect(table).toBeDefined();

    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(associationPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });

  it('should create join table from entity and association', () => {
    expect(tableEntities(metaEd, namespace).get(entityName + associationName)).toBeDefined();
  });

  it('should have join table with two columns', () => {
    expect((tableEntities(metaEd, namespace).get(entityName + associationName) as Table).columns).toHaveLength(2);
  });

  it('should have join table with foreign key to entity', () => {
    const joinTable: Table = tableEntities(metaEd, namespace).get(entityName + associationName) as Table;
    expect(joinTable.columns[0].name).toBe(entityPkPropertyName);
    expect(joinTable.columns[0].isPartOfPrimaryKey).toBe(true);
  });

  it('should have join table with foreign key to association', () => {
    const joinTable: Table = tableEntities(metaEd, namespace).get(entityName + associationName) as Table;
    expect(joinTable.columns[1].name).toBe(associationPkPropertyName);
    expect(joinTable.columns[1].isPartOfPrimaryKey).toBe(true);
  });
});

describe('when AssociationTableEnhancer enhances entity with required collection common property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const commonName = 'CommonName';
  const documentation = 'Documentation';
  const entityPkPropertyName = 'EntityPkPropertyName';
  const commonPkPropertyName = 'CommonPkPropertyName';

  beforeAll(() => {
    const entity: Association = Object.assign(newAssociation(), {
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
      referencedNamespaceName: namespace.namespaceName,
      withContext: '',
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
      withContext: '',
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

  it('should create join table from entity and association', () => {
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

describe('when AssociationTableEnhancer enhances entity with primary key reference to another entity with a non primary key reference', () => {
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
    const entity: Association = Object.assign(newAssociation(), {
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
    const requiredProperty: AssociationProperty = Object.assign(newAssociationProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
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

    const referencedEntity: Association = Object.assign(newAssociation(), {
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
    const referencedEntityRequiredProperty: AssociationProperty = Object.assign(newAssociationProperty(), {
      metaEdName: subReferencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
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

    const subReferencedEntity: Association = Object.assign(newAssociation(), {
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

describe('when AssociationTableEnhancer enhances entity with primary key reference to another entity with a primary key reference', () => {
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
    const entity: Association = Object.assign(newAssociation(), {
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
    const entityRequiredProperty: AssociationProperty = Object.assign(newAssociationProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
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

    const referencedEntity: Association = Object.assign(newAssociation(), {
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
    const referencedEntityPkProperty2: AssociationProperty = Object.assign(newAssociationProperty(), {
      metaEdName: subReferencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
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

    const subReferencedEntity: Association = Object.assign(newAssociation(), {
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

describe("when AssociationTableEnhancer enhances entity with collection property whose name starts with the referenced entity's name", () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const referencedEntityName = 'EntityNameOfReference';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: Association = Object.assign(newAssociation(), {
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
    const entityCollectionProperty: AssociationProperty = Object.assign(newAssociationProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: true,
        },
      },
    });
    entity.data.edfiOds.odsProperties.push(entityCollectionProperty);

    const referencedEntity: Association = Object.assign(newAssociation(), {
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

describe('when AssociationTableEnhancer enhances entity with two reference properties that have same primary key names', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const referencedEntityName1 = 'ReferencedEntityName1';
  const referencedEntityName2 = 'ReferencedEntityName2';
  const commonPkPropertyName = 'CommonPkPropertyName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: Association = Object.assign(newAssociation(), {
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
    const entityPkProperty1: AssociationProperty = Object.assign(newAssociationProperty(), {
      metaEdName: referencedEntityName1,
      referencedNamespaceName: namespace.namespaceName,
      isPartOfIdentity: true,
      parentEntity: entity,
      data: {
        edfiOds: {
          odsContextPrefix: '',
          odsIsCollection: false,
        },
      },
    });
    const entityPkProperty2: AssociationProperty = Object.assign(newAssociationProperty(), {
      metaEdName: referencedEntityName2,
      referencedNamespaceName: namespace.namespaceName,
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

    const referencedEntity1: Association = Object.assign(newAssociation(), {
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

    const referencedEntity2: Association = Object.assign(newAssociation(), {
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

describe('when AssociationTableEnhancer enhances entity with optional collection property with context', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const contextName = 'ContextName';
  const entityName = 'EntityName';
  const optionalCollectionPropertyName = 'OptionalCollectionPropertyName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: Association = Object.assign(newAssociation(), {
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
      referencedNamespaceName: namespace.namespaceName,
      isOptionalCollection: true,
      withContext: contextName,
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

  it('should have join table with context', () => {
    expect(tableEntities(metaEd, namespace).get(entityName + contextName + optionalCollectionPropertyName)).toBeDefined();
  });
});

describe('when AssociationTableEnhancer enhances entity with collection enumeration property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const enumerationName = 'EnumerationName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: Association = Object.assign(newAssociation(), {
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
      referencedNamespaceName: namespace.namespaceName,
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

describe('when AssociationTableEnhancer enhances entity with enumeration property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const enumerationName = 'EnumerationName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: Association = Object.assign(newAssociation(), {
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
      referencedNamespaceName: namespace.namespaceName,
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

describe("when AssociationTableEnhancer enhances entity with enumeration property whose name starts with the parent entity's name", () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const enumerationName = 'EntityNameForEnumeration';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: Association = Object.assign(newAssociation(), {
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
      referencedNamespaceName: namespace.namespaceName,
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

describe('when AssociationTableEnhancer enhances entity with descriptor collection property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const descriptorName = 'DescriptorName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: Association = Object.assign(newAssociation(), {
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
      referencedNamespaceName: namespace.namespaceName,
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

describe('when AssociationTableEnhancer enhances entity with descriptor property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const descriptorName = 'DescriptorName';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: Association = Object.assign(newAssociation(), {
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
      referencedNamespaceName: namespace.namespaceName,
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

describe("when AssociationTableEnhancer enhances entity with descriptor collection property whose name starts with the parent entity's name", () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const entityName = 'EntityName';
  const descriptorName = 'EntityNameForDescriptor';

  beforeAll(() => {
    const documentation = 'Documentation';
    const entity: Association = Object.assign(newAssociation(), {
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
      referencedNamespaceName: namespace.namespaceName,
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

describe("when AssociationTableEnhancer enhances entity with common collection property whose name starts with the parent entity's name", () => {
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
    const entity: Association = Object.assign(newAssociation(), {
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
      referencedNamespaceName: namespace.namespaceName,
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
