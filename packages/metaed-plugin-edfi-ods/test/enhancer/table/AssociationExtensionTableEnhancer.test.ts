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
import {
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
import { enhance } from '../../../src/enhancer/table/AssociationExtensionTableEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';
import { Table } from '../../../src/model/database/Table';

describe('when AssociationExtensionTableEnhancer enhances association extension', () => {
  const namespaceName = 'edfi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);

  const documentation = 'Documentation';
  const associationExtensionName = 'AssociationExtensionName';
  const associationExtensionPropertyName = 'AssociationExtensionPropertyName';

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

    const associationExtension: AssociationExtension = Object.assign(newAssociationExtension(), {
      namespace: extensionNamespace,
      documentation,
      metaEdName: associationExtensionName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          odsTableName: associationExtensionName,
          odsExtensionName: associationExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
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
          odsName: associationExtensionPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.odsProperties.push(associationExtensionProperty);
    addEntityForNamespace(associationExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName)).toBeDefined();
  });

  it('should have schema equal to namespace', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(associationExtensionName) as Table).schema).toBe('extension');
  });

  it('should have description equal to documentation', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(associationExtensionName) as Table).description).toBe(
      documentation,
    );
  });

  it('should have one column', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(associationExtensionName) as Table;
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(associationExtensionPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(false);
  });

  it('should include create date column', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(associationExtensionName) as Table).includeCreateDateColumn).toBe(
      true,
    );
  });
});

describe('when AssociationExtensionTableEnhancer enhances association extension with primary key', () => {
  const namespaceName = 'edfi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const associationExtensionName = 'AssociationExtensionName';
  const associationExtensionPkPropertyName = 'AssociationExtensionPkPropertyName';

  beforeAll(() => {
    const associationName = 'AssociationName';
    const association: Association = Object.assign(newAssociation(), {
      namespace,
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

    const associationExtension: AssociationExtension = Object.assign(newAssociationExtension(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          odsTableName: associationExtensionName,
          odsExtensionName: associationExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
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
          odsName: associationExtensionPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.odsProperties.push(associationExtensionPkProperty);
    addEntityForNamespace(associationExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName)).toBeDefined();
  });

  it('should have one primary key column', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(associationExtensionName) as Table;
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(associationExtensionPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });

  it('should include create date column', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(associationExtensionName) as Table).includeCreateDateColumn).toBe(
      true,
    );
  });
});

describe('when AssociationExtensionTableEnhancer enhances association extension with common extension override', () => {
  const namespaceName = 'edfi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const commonName = 'CommonName';
  const commonExtensionName = 'CommonExtensionName';
  const associationName = 'AssociationName';
  const associationExtensionName = 'AssociationExtensionName';

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      namespace,
      metaEdName: commonName,
      data: {
        edfiOds: {
          odsTableName: commonName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const commonPkPropertyName = 'CommonPkPropertyName';
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: common,
      data: {
        edfiOds: {
          odsName: commonPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    common.data.edfiOds.odsProperties.push(commonPkProperty);
    common.data.edfiOds.odsIdentityProperties.push(commonPkProperty);
    addEntityForNamespace(common);

    const association: Association = Object.assign(newAssociation(), {
      namespace,
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

    const commonExtension: CommonExtension = Object.assign(newCommonExtension(), {
      namespace: extensionNamespace,
      metaEdName: commonExtensionName,
      baseEntityName: common.metaEdName,
      baseEntity: common,
      data: {
        edfiOds: {
          odsTableName: commonExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const commonExtensionRequiredPropertyName = 'CommonExtensionRequiredPropertyName';
    const commonExtensionRequiredProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonExtensionRequiredPropertyName,
      isRequired: true,
      parentEntity: commonExtension,
      data: {
        edfiOds: {
          odsName: commonExtensionRequiredPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    commonExtension.data.edfiOds.odsProperties.push(commonExtensionRequiredProperty);
    addEntityForNamespace(commonExtension);
    const associationExtension: AssociationExtension = Object.assign(newAssociationExtension(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          odsTableName: associationExtensionName,
          odsExtensionName: associationExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const associationExtensionRequiredPropertyName = 'AssociationExtensionRequiredPropertyName';
    const associationExtensionRequiredProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionRequiredPropertyName,
      isRequired: true,
      parentEntity: associationExtension,
      data: {
        edfiOds: {
          odsName: associationExtensionRequiredPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.odsProperties.push(associationExtensionRequiredProperty);
    const associationExtensionReferencePropertyName = 'AssociationExtensionReferencePropertyName';
    const associationExtensionReferenceProperty: AssociationProperty = Object.assign(newAssociationProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionReferencePropertyName,
      isPartOfIdentity: true,
      parentEntity: associationExtension,
      referencedEntity: association,
      data: {
        edfiOds: {
          odsName: associationExtensionReferencePropertyName,
          odsContextPrefix: '',
          odsDeleteCascadePrimaryKey: true,
        },
      },
    });
    associationExtension.data.edfiOds.odsProperties.push(associationExtensionReferenceProperty);
    associationExtension.data.edfiOds.odsIdentityProperties.push(associationExtensionReferenceProperty);
    const associationExtensionCommonExtensionOverrideProperty: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonExtensionName,
      isRequired: true,
      parentEntity: associationExtension,
      referencedEntity: commonExtension,
      isExtensionOverride: true,
      data: {
        edfiOds: {
          odsName: commonExtensionName,
          odsContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.odsProperties.push(associationExtensionCommonExtensionOverrideProperty);
    addEntityForNamespace(associationExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(2);
  });

  it('should create table for association extension', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName)).toBeDefined();
  });

  it('should include create date column', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(associationExtensionName) as Table).includeCreateDateColumn).toBe(
      true,
    );
  });

  it('should not create common extension override join table', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(`${associationName + commonExtensionName}Extension`)).toBeDefined();
  });
});

describe('when AssociationExtensionTableEnhancer enhances association extension with common', () => {
  const namespaceName = 'edfi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const commonName = 'CommonName';
  const associationName = 'AssociationName';
  const associationExtensionName = 'AssociationExtensionName';

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      namespace,
      metaEdName: commonName,
      data: {
        edfiOds: {
          odsTableName: commonName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const commonPkPropertyName = 'CommonPkPropertyName';
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: common,
      data: {
        edfiOds: {
          odsName: commonPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    common.data.edfiOds.odsProperties.push(commonPkProperty);
    common.data.edfiOds.odsIdentityProperties.push(commonPkProperty);
    addEntityForNamespace(common);

    const association: Association = Object.assign(newAssociation(), {
      namespace,
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

    const associationExtension: AssociationExtension = Object.assign(newAssociationExtension(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          odsTableName: associationExtensionName,
          odsExtensionName: associationExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const associationExtensionRequiredPropertyName = 'AssociationExtensionRequiredPropertyName';
    const associationExtensionRequiredProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionRequiredPropertyName,
      isRequired: true,
      parentEntity: associationExtension,
      data: {
        edfiOds: {
          odsName: associationExtensionRequiredPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.odsProperties.push(associationExtensionRequiredProperty);
    const associationExtensionReferencePropertyName = 'AssociationExtensionReferencePropertyName';
    const associationExtensionReferenceProperty: AssociationProperty = Object.assign(newAssociationProperty(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionReferencePropertyName,
      isPartOfIdentity: true,
      parentEntity: associationExtension,
      referencedEntity: association,
      data: {
        edfiOds: {
          odsName: associationExtensionReferencePropertyName,
          odsContextPrefix: '',
          odsDeleteCascadePrimaryKey: true,
        },
      },
    });
    associationExtension.data.edfiOds.odsProperties.push(associationExtensionReferenceProperty);
    associationExtension.data.edfiOds.odsIdentityProperties.push(associationExtensionReferenceProperty);
    const associationExtensionCommonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonName,
      isRequired: true,
      parentEntity: associationExtension,
      referencedEntity: common,
      isExtensionOverride: false,
      data: {
        edfiOds: {
          odsName: commonName,
          odsContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.odsProperties.push(associationExtensionCommonProperty);
    addEntityForNamespace(associationExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(2);
  });

  it('should create a table for association extension', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName)).toBeDefined();
  });

  it('should include create date column', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(associationExtensionName) as Table).includeCreateDateColumn).toBe(
      true,
    );
  });

  it('should create join table from association and common', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationName + commonName)).toBeDefined();
  });
});

describe('when AssociationExtensionTableEnhancer enhances association extension with only common', () => {
  const namespaceName = 'edfi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const commonName = 'CommonName';
  const associationName = 'AssociationName';
  const associationExtensionName = 'AssociationExtensionName';

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      namespace,
      metaEdName: commonName,
      data: {
        edfiOds: {
          odsTableName: commonName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const commonPkPropertyName = 'CommonPkPropertyName';
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: common,
      data: {
        edfiOds: {
          odsName: commonPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    common.data.edfiOds.odsProperties.push(commonPkProperty);
    common.data.edfiOds.odsIdentityProperties.push(commonPkProperty);
    addEntityForNamespace(common);

    const association: Association = Object.assign(newAssociation(), {
      namespace,
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

    const associationExtension: AssociationExtension = Object.assign(newAssociationExtension(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          odsTableName: associationExtensionName,
          odsExtensionName: associationExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const associationExtensionCommonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonName,
      isRequired: true,
      parentEntity: associationExtension,
      referencedEntity: common,
      isExtensionOverride: false,
      data: {
        edfiOds: {
          odsName: commonName,
          odsContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.odsProperties.push(associationExtensionCommonProperty);
    addEntityForNamespace(associationExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
  });

  it('should not create a table for association extension', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName)).toBeUndefined();
  });

  it('should create join table from association and common', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationName + commonName)).toBeDefined();
  });
});

describe('when AssociationExtensionTableEnhancer enhances association extension with only commons', () => {
  const namespaceName = 'edfi';
  const namespace: Namespace = { ...newNamespace(), namespaceName };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const commonName1 = 'CommonName1';
  const commonName2 = 'CommonName2';
  const associationName = 'AssociationName';
  const associationExtensionName = 'AssociationExtensionName';

  beforeAll(() => {
    const common: Common = Object.assign(newCommon(), {
      namespace,
      metaEdName: commonName1,
      data: {
        edfiOds: {
          odsTableName: commonName1,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const commonPkPropertyName = 'CommonPkPropertyName';
    const commonPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: commonPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: common,
      data: {
        edfiOds: {
          odsName: commonPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    common.data.edfiOds.odsProperties.push(commonPkProperty);
    common.data.edfiOds.odsIdentityProperties.push(commonPkProperty);
    addEntityForNamespace(common);

    const association: Association = Object.assign(newAssociation(), {
      namespace,
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

    const associationExtension: AssociationExtension = Object.assign(newAssociationExtension(), {
      namespace: extensionNamespace,
      metaEdName: associationExtensionName,
      baseEntityName: associationName,
      baseEntity: association,
      data: {
        edfiOds: {
          odsTableName: associationExtensionName,
          odsExtensionName: associationExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const associationExtensionCommonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonName1,
      isRequired: true,
      parentEntity: associationExtension,
      referencedEntity: common,
      isExtensionOverride: false,
      data: {
        edfiOds: {
          odsName: commonName1,
          odsContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.odsProperties.push(associationExtensionCommonProperty);
    const associationExtensionCommonProperty2: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonName2,
      isRequired: true,
      parentEntity: associationExtension,
      referencedEntity: common,
      isExtensionOverride: false,
      data: {
        edfiOds: {
          odsName: commonName2,
          odsContextPrefix: '',
        },
      },
    });
    associationExtension.data.edfiOds.odsProperties.push(associationExtensionCommonProperty2);
    addEntityForNamespace(associationExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(2);
  });

  it('should not create a table for association extension', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationExtensionName)).toBeUndefined();
  });

  it('should create join table from association and common', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationName + commonName1)).toBeDefined();
  });

  it('should create join table from association and common collection', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(associationName + commonName2)).toBeDefined();
  });
});
