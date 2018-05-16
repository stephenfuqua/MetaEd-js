// @flow
import {
  addEntityForNamespace,
  newCommon,
  newCommonExtension,
  newCommonProperty,
  newAssociation,
  newAssociationExtension,
  newAssociationProperty,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import type {
  Association,
  AssociationExtension,
  AssociationProperty,
  Common,
  CommonExtension,
  CommonProperty,
  IntegerProperty,
  MetaEdEnvironment,
  Namespace,
} from 'metaed-core';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import { enhance } from '../../../src/enhancer/table/AssociationExtensionTableEnhancerV2';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';
import type { Table } from '../../../src/model/database/Table';

describe('when AssociationExtensionTableEnhancerV2 enhances association extension', () => {
  const namespaceName = 'edfi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const documentation: string = 'Documentation';
  const associationExtensionName: string = 'AssociationExtensionName';
  const associationExtensionPropertyName: string = 'AssociationExtensionPropertyName';

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

    const associationExtension: AssociationExtension = Object.assign(newAssociationExtension(), {
      namespace: extensionNamespace,
      documentation,
      metaEdName: associationExtensionName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          ods_TableName: associationExtensionName,
          ods_ExtensionName: associationExtensionName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const associationExtensionProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionPropertyName,
      isPartOfIdentity: false,
      parentEntity: associationExtension,
      data: {
        edfiOds: {
          ods_Name: associationExtensionPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.ods_Properties.push(associationExtensionProperty);
    addEntityForNamespace(associationExtension);

    metaEd.dataStandardVersion = '2.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName)).toBeDefined();
  });

  it('should have schema equal to namespace', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName).schema).toBe('extension');
  });

  it('should have description equal to documentation', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName).description).toBe(documentation);
  });

  it('should have one column', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(associationExtensionName);
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(associationExtensionPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(false);
  });
});

describe('when AssociationExtensionTableEnhancerV2 enhances association extension with primary key', () => {
  const namespaceName = 'edfi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const associationExtensionName: string = 'AssociationExtensionName';
  const associationExtensionPkPropertyName: string = 'AssociationExtensionPkPropertyName';

  beforeAll(() => {
    const associationName: string = 'AssociationName';
    const association: Association = Object.assign(newAssociation(), {
      namespace,
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

    const associationExtension: AssociationExtension = Object.assign(newAssociationExtension(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          ods_TableName: associationExtensionName,
          ods_ExtensionName: associationExtensionName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const associationExtensionPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: associationExtension,
      data: {
        edfiOds: {
          ods_Name: associationExtensionPkPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.ods_Properties.push(associationExtensionPkProperty);
    addEntityForNamespace(associationExtension);

    metaEd.dataStandardVersion = '2.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName)).toBeDefined();
  });

  it('should have one primary key column', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(associationExtensionName);
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(associationExtensionPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });
});

describe('when AssociationExtensionTableEnhancerV2 enhances association extension with common extension override', () => {
  const namespaceName = 'edfi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const commonName: string = 'CommonName';
  const commonExtensionName: string = 'CommonExtensionName';
  const associationName: string = 'AssociationName';
  const associationExtensionName: string = 'AssociationExtensionName';

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      namespace,
      metaEdName: commonName,
      data: {
        edfiOds: {
          ods_TableName: commonName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const commonPkPropertyName: string = 'CommonPkPropertyName';
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: common,
      data: {
        edfiOds: {
          ods_Name: commonPkPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    common.data.edfiOds.ods_Properties.push(commonPkProperty);
    common.data.edfiOds.ods_IdentityProperties.push(commonPkProperty);
    addEntityForNamespace(common);

    const association: Association = Object.assign(newAssociation(), {
      namespace,
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

    const commonExtension: CommonExtension = Object.assign(newCommonExtension(), {
      namespace: extensionNamespace,
      metaEdName: commonExtensionName,
      baseEntityName: common.metaEdName,
      baseEntity: common,
      data: {
        edfiOds: {
          ods_TableName: commonExtensionName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const commonExtensionRequiredPropertyName: string = 'CommonExtensionRequiredPropertyName';
    const commonExtensionRequiredProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonExtensionRequiredPropertyName,
      isRequired: true,
      parentEntity: commonExtension,
      data: {
        edfiOds: {
          ods_Name: commonExtensionRequiredPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    commonExtension.data.edfiOds.ods_Properties.push(commonExtensionRequiredProperty);
    addEntityForNamespace(commonExtension);

    common.extender = commonExtension;

    const associationExtension: AssociationExtension = Object.assign(newAssociationExtension(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          ods_TableName: associationExtensionName,
          ods_ExtensionName: associationExtensionName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const associationExtensionRequiredPropertyName: string = 'AssociationExtensionRequiredPropertyName';
    const associationExtensionRequiredProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionRequiredPropertyName,
      isRequired: true,
      parentEntity: associationExtension,
      data: {
        edfiOds: {
          ods_Name: associationExtensionRequiredPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.ods_Properties.push(associationExtensionRequiredProperty);
    const associationExtensionReferencePropertyName: string = 'AssociationExtensionReferencePropertyName';
    const associationExtensionReferenceProperty: AssociationProperty = Object.assign(newAssociationProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionReferencePropertyName,
      isPartOfIdentity: true,
      parentEntity: associationExtension,
      referencedEntity: association,
      data: {
        edfiOds: {
          ods_Name: associationExtensionReferencePropertyName,
          ods_ContextPrefix: '',
          ods_DeleteCascadePrimaryKey: true,
        },
      },
    });
    associationExtension.data.edfiOds.ods_Properties.push(associationExtensionReferenceProperty);
    associationExtension.data.edfiOds.ods_IdentityProperties.push(associationExtensionReferenceProperty);
    const associationExtensionCommonExtensionOverrideProperty: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonExtensionName,
      isRequired: true,
      parentEntity: associationExtension,
      referencedEntity: commonExtension,
      isExtensionOverride: true,
      data: {
        edfiOds: {
          ods_Name: commonExtensionName,
          ods_ContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.ods_Properties.push(associationExtensionCommonExtensionOverrideProperty);
    addEntityForNamespace(associationExtension);

    metaEd.dataStandardVersion = '2.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
  });

  it('should create table only for association extension', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName)).toBeDefined();
  });

  it('should not create common extension override join table', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationName + commonExtensionName)).toBeUndefined();
  });
});

describe('when AssociationExtensionTableEnhancerV2 enhances association extension with common', () => {
  const namespaceName = 'edfi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const commonName: string = 'CommonName';
  const associationName: string = 'AssociationName';
  const associationExtensionName: string = 'AssociationExtensionName';

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      namespace,
      metaEdName: commonName,
      data: {
        edfiOds: {
          ods_TableName: commonName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const commonPkPropertyName: string = 'CommonPkPropertyName';
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: common,
      data: {
        edfiOds: {
          ods_Name: commonPkPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    common.data.edfiOds.ods_Properties.push(commonPkProperty);
    common.data.edfiOds.ods_IdentityProperties.push(commonPkProperty);
    addEntityForNamespace(common);

    const association: Association = Object.assign(newAssociation(), {
      namespace,
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

    const associationExtension: AssociationExtension = Object.assign(newAssociationExtension(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          ods_TableName: associationExtensionName,
          ods_ExtensionName: associationExtensionName,
          ods_Properties: [],
          ods_IdentityProperties: [],
        },
      },
    });
    const associationExtensionRequiredPropertyName: string = 'AssociationExtensionRequiredPropertyName';
    const associationExtensionRequiredProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionRequiredPropertyName,
      isRequired: true,
      parentEntity: associationExtension,
      data: {
        edfiOds: {
          ods_Name: associationExtensionRequiredPropertyName,
          ods_ContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.ods_Properties.push(associationExtensionRequiredProperty);
    const associationExtensionReferencePropertyName: string = 'AssociationExtensionReferencePropertyName';
    const associationExtensionReferenceProperty: AssociationProperty = Object.assign(newAssociationProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionReferencePropertyName,
      isPartOfIdentity: true,
      parentEntity: associationExtension,
      referencedEntity: association,
      data: {
        edfiOds: {
          ods_Name: associationExtensionReferencePropertyName,
          ods_ContextPrefix: '',
          ods_DeleteCascadePrimaryKey: true,
        },
      },
    });
    associationExtension.data.edfiOds.ods_Properties.push(associationExtensionReferenceProperty);
    associationExtension.data.edfiOds.ods_IdentityProperties.push(associationExtensionReferenceProperty);
    const associationExtensionCommonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonName,
      isRequired: true,
      parentEntity: associationExtension,
      referencedEntity: common,
      isExtensionOverride: false,
      data: {
        edfiOds: {
          ods_Name: commonName,
          ods_ContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.ods_Properties.push(associationExtensionCommonProperty);
    addEntityForNamespace(associationExtension);

    metaEd.dataStandardVersion = '2.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(2);
  });

  it('should create a table for association extension', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName)).toBeDefined();
  });

  it('should create join table from association and common', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationName + commonName)).toBeDefined();
  });
});
