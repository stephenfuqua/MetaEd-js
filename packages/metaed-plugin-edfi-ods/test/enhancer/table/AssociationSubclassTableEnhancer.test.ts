import {
  addEntityForNamespace,
  newAssociation,
  newAssociationSubclass,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import { Association, AssociationSubclass, IntegerProperty, MetaEdEnvironment, Namespace } from 'metaed-core';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import { enhance } from '../../../src/enhancer/table/AssociationSubclassTableEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';
import { Table } from '../../../src/model/database/Table';

describe('when AssociationSubclassTableEnhancer enhances association subclass', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const documentation = 'Documentation';
  const associationSubclassName = 'AssociationSubclassName';
  const associationSubclassPropertyName = 'AssociationSubclassPropertyName';

  beforeAll(() => {
    const associationName = 'AssociationName';
    const association: Association = Object.assign(newAssociation(), {
      namespace,
      documentation,
      metaEdName: associationName,
      data: {
        edfiOds: {
          odsTableName: associationName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const associationPkPropertyName = 'AssociationPkPropertyName';
    const associationPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: associationPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: association,
      data: {
        edfiOds: {
          odsName: associationPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    association.data.edfiOds.odsProperties.push(associationPkProperty);
    addEntityForNamespace(association);

    const associationSubclass: AssociationSubclass = Object.assign(newAssociationSubclass(), {
      namespace: extensionNamespace,
      documentation,
      metaEdName: associationSubclassName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          odsTableName: associationSubclassName,
          odsExtensionName: associationSubclassName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const associationSubclassProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationSubclassPropertyName,
      isPartOfIdentity: false,
      parentEntity: associationSubclass,
      data: {
        edfiOds: {
          odsName: associationSubclassPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    associationSubclass.data.edfiOds.odsProperties.push(associationSubclassProperty);
    addEntityForNamespace(associationSubclass);

    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(associationSubclassName)).toBeDefined();
  });

  it('should have schema equal to namespace', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(associationSubclassName) as Table).schema).toBe('extension');
  });

  it('should have description equal to documentation', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(associationSubclassName) as Table).description).toBe(
      documentation,
    );
  });

  it('should have one column', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(associationSubclassName) as Table;
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(associationSubclassPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(false);
  });
});

describe('when AssociationSubclassTableEnhancer enhances association subclass with primary key', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const documentation = 'Documentation';
  const associationSubclassName = 'AssociationSubclassName';
  const associationSubclassPkPropertyName = 'AssociationSubclassPkPropertyName';

  beforeAll(() => {
    const associationName = 'AssociationName';
    const association: Association = Object.assign(newAssociation(), {
      namespace,
      documentation,
      metaEdName: associationName,
      data: {
        edfiOds: {
          odsTableName: associationName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const associationPkPropertyName = 'AssociationPkPropertyName';
    const associationPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: associationPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: association,
      data: {
        edfiOds: {
          odsName: associationPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    association.data.edfiOds.odsProperties.push(associationPkProperty);
    addEntityForNamespace(association);

    const associationSubclass: AssociationSubclass = Object.assign(newAssociationSubclass(), {
      namespace: extensionNamespace,
      documentation,
      metaEdName: associationSubclassName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          odsTableName: associationSubclassName,
          odsExtensionName: associationSubclassName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const associationSubclassPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationSubclassPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: associationSubclass,
      data: {
        edfiOds: {
          odsName: associationSubclassPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    associationSubclass.data.edfiOds.odsProperties.push(associationSubclassPkProperty);
    addEntityForNamespace(associationSubclass);

    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(associationSubclassName)).toBeDefined();
  });

  it('should have one primary key column', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(associationSubclassName) as Table;
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(associationSubclassPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });
});
