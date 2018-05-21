// @flow
import {
  addEntityForNamespace,
  newAssociation,
  newAssociationSubclass,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import type { Association, AssociationSubclass, IntegerProperty, MetaEdEnvironment, Namespace } from 'metaed-core';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import { enhance } from '../../../src/enhancer/table/AssociationSubclassTableEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';
import type { Table } from '../../../src/model/database/Table';
import { asTable } from '../../../src/model/database/Table';

describe('when AssociationSubclassTableEnhancer enhances association subclass', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const documentation: string = 'Documentation';
  const associationSubclassName: string = 'AssociationSubclassName';
  const associationSubclassPropertyName: string = 'AssociationSubclassPropertyName';

  beforeAll(() => {
    const associationName: string = 'AssociationName';
    const association: Association = Object.assign(newAssociation(), {
      namespace,
      documentation,
      metaEdName: associationName,
      data: {
        edfiOds: {
          ods_TableName: associationName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const associationPkPropertyName: string = 'AssociationPkPropertyName';
    const associationPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: associationPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: association,
      data: {
        edfiOds: {
          ods_Name: associationPkPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    association.data.edfiOds.ods_Properties.push(associationPkProperty);
    addEntityForNamespace(association);

    const associationSubclass: AssociationSubclass = Object.assign(newAssociationSubclass(), {
      namespace: extensionNamespace,
      documentation,
      metaEdName: associationSubclassName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          ods_TableName: associationSubclassName,
          ods_ExtensionName: associationSubclassName,
          ods_Properties: [],
          ods_IdentityProperties: [],
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
          ods_Name: associationSubclassPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    associationSubclass.data.edfiOds.ods_Properties.push(associationSubclassProperty);
    addEntityForNamespace(associationSubclass);

    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(associationSubclassName)).toBeDefined();
  });

  it('should have schema equal to namespace', () => {
    // $FlowIgnore - null check
    expect(asTable(tableEntities(metaEd, extensionNamespace).get(associationSubclassName)).schema).toBe('extension');
  });

  it('should have description equal to documentation', () => {
    // $FlowIgnore - null check
    expect(asTable(tableEntities(metaEd, extensionNamespace).get(associationSubclassName)).description).toBe(documentation);
  });

  it('should have one column', () => {
    const table: Table = asTable(tableEntities(metaEd, extensionNamespace).get(associationSubclassName));
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(associationSubclassPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(false);
  });
});

describe('when AssociationSubclassTableEnhancer enhances association subclass with primary key', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const documentation: string = 'Documentation';
  const associationSubclassName: string = 'AssociationSubclassName';
  const associationSubclassPkPropertyName: string = 'AssociationSubclassPkPropertyName';

  beforeAll(() => {
    const associationName: string = 'AssociationName';
    const association: Association = Object.assign(newAssociation(), {
      namespace,
      documentation,
      metaEdName: associationName,
      data: {
        edfiOds: {
          ods_TableName: associationName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const associationPkPropertyName: string = 'AssociationPkPropertyName';
    const associationPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: associationPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: association,
      data: {
        edfiOds: {
          ods_Name: associationPkPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    association.data.edfiOds.ods_Properties.push(associationPkProperty);
    addEntityForNamespace(association);

    const associationSubclass: AssociationSubclass = Object.assign(newAssociationSubclass(), {
      namespace: extensionNamespace,
      documentation,
      metaEdName: associationSubclassName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          ods_TableName: associationSubclassName,
          ods_ExtensionName: associationSubclassName,
          ods_Properties: [],
          ods_IdentityProperties: [],
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
          ods_Name: associationSubclassPkPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    associationSubclass.data.edfiOds.ods_Properties.push(associationSubclassPkProperty);
    addEntityForNamespace(associationSubclass);

    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(associationSubclassName)).toBeDefined();
  });

  it('should have one primary key column', () => {
    const table: Table = asTable(tableEntities(metaEd, extensionNamespace).get(associationSubclassName));
    expect(table.columns).toHaveLength(1);
    // $FlowIgnore - null check
    expect(table.columns[0].name).toBe(associationSubclassPkPropertyName);
    // $FlowIgnore - null check
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });
});
