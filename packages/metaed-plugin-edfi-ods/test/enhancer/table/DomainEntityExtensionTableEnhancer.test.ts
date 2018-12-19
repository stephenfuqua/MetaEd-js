import {
  addEntityForNamespace,
  newCommon,
  newCommonExtension,
  newCommonProperty,
  newDomainEntity,
  newDomainEntityExtension,
  newDomainEntityProperty,
  newIntegerProperty,
  newMetaEdEnvironment,
  newNamespace,
} from 'metaed-core';
import {
  Common,
  CommonExtension,
  CommonProperty,
  DomainEntity,
  DomainEntityExtension,
  DomainEntityProperty,
  IntegerProperty,
  MetaEdEnvironment,
  Namespace,
} from 'metaed-core';
import { tableEntities } from '../../../src/enhancer/EnhancerHelper';
import { enhance } from '../../../src/enhancer/table/DomainEntityExtensionTableEnhancer';
import { enhance as initializeEdFiOdsEntityRepository } from '../../../src/model/EdFiOdsEntityRepository';
import { Table } from '../../../src/model/database/Table';

describe('when DomainEntityExtensionTableEnhancer enhances domain entity extension', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const documentation = 'Documentation';
  const domainEntityExtensionName = 'DomainEntityExtensionName';
  const domainEntityExtensionPropertyName = 'DomainEntityExtensionPropertyName';

  beforeAll(() => {
    const domainEntityName = 'DomainEntityName';
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      documentation,
      metaEdName: domainEntityName,
      data: {
        edfiOds: {
          odsTableName: domainEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityPkPropertyName = 'DomainEntityPkPropertyName';
    const domainEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntity,
      data: {
        edfiOds: {
          odsName: domainEntityPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntity.data.edfiOds.odsProperties.push(domainEntityPkProperty);
    addEntityForNamespace(domainEntity);

    const domainEntityExtension: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      namespace: extensionNamespace,
      documentation,
      metaEdName: domainEntityExtensionName,
      baseEntityName: domainEntityName,
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          odsTableName: domainEntityExtensionName,
          odsExtensionName: domainEntityExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityExtensionProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityExtensionPropertyName,
      isPartOfIdentity: false,
      parentEntity: domainEntityExtension,
      data: {
        edfiOds: {
          odsName: domainEntityExtensionPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntityExtension.data.edfiOds.odsProperties.push(domainEntityExtensionProperty);
    addEntityForNamespace(domainEntityExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName)).toBeDefined();
  });

  it('should have schema equal to namespace', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName) as Table).schema).toBe('extension');
  });

  it('should have description equal to documentation', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName) as Table).description).toBe(
      documentation,
    );
  });

  it('should have two columns', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName) as Table;
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(domainEntityExtensionPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(false);
  });
});

describe('when DomainEntityExtensionTableEnhancer enhances domain entity extension with primary key', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const domainEntityExtensionName = 'DomainEntityExtensionName';
  const domainEntityExtensionPkPropertyName = 'DomainEntityExtensionPkPropertyName';

  beforeAll(() => {
    const domainEntityName = 'DomainEntityName';
    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName,
      data: {
        edfiOds: {
          odsTableName: domainEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityPkPropertyName = 'DomainEntityPkPropertyName';
    const domainEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntity,
      data: {
        edfiOds: {
          odsName: domainEntityPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntity.data.edfiOds.odsProperties.push(domainEntityPkProperty);
    addEntityForNamespace(domainEntity);

    const domainEntityExtension: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityExtensionName,
      baseEntityName: domainEntityName,
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          odsTableName: domainEntityExtensionName,
          odsExtensionName: domainEntityExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityExtensionPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityExtensionPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntityExtension,
      data: {
        edfiOds: {
          odsName: domainEntityExtensionPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntityExtension.data.edfiOds.odsProperties.push(domainEntityExtensionPkProperty);
    addEntityForNamespace(domainEntityExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName)).toBeDefined();
  });

  it('should have one primary key column', () => {
    const table: Table = tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName) as Table;
    expect(table.columns).toHaveLength(1);
    expect(table.columns[0].name).toBe(domainEntityExtensionPkPropertyName);
    expect(table.columns[0].isPartOfPrimaryKey).toBe(true);
  });

  it('should include create date column', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName) as Table).includeCreateDateColumn).toBe(
      true,
    );
  });
});

describe('when DomainEntityExtensionTableEnhancer enhances domain entity extension with common extension override', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const commonName = 'CommonName';
  const commonExtensionName = 'CommonExtensionName';
  const domainEntityName = 'DomainEntityName';
  const domainEntityExtensionName = 'DomainEntityExtensionName';

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

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName,
      data: {
        edfiOds: {
          odsTableName: domainEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityPkPropertyName = 'DomainEntityPkPropertyName';
    const domainEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntity,
      data: {
        edfiOds: {
          odsName: domainEntityPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntity.data.edfiOds.odsProperties.push(domainEntityPkProperty);
    addEntityForNamespace(domainEntity);

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

    const domainEntityExtension: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityExtensionName,
      baseEntityName: domainEntityName,
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          odsTableName: domainEntityExtensionName,
          odsExtensionName: domainEntityExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityExtensionRequiredPropertyName = 'DomainEntityExtensionRequiredPropertyName';
    const domainEntityExtensionRequiredProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityExtensionRequiredPropertyName,
      isRequired: true,
      parentEntity: domainEntityExtension,
      data: {
        edfiOds: {
          odsName: domainEntityExtensionRequiredPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntityExtension.data.edfiOds.odsProperties.push(domainEntityExtensionRequiredProperty);
    const domainEntityExtensionReferencePropertyName = 'DomainEntityExtensionReferencePropertyName';
    const domainEntityExtensionReferenceProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityExtensionReferencePropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntityExtension,
      referencedEntity: domainEntity,
      data: {
        edfiOds: {
          odsName: domainEntityExtensionReferencePropertyName,
          odsContextPrefix: '',
          odsDeleteCascadePrimaryKey: true,
        },
      },
    });
    domainEntityExtension.data.edfiOds.odsProperties.push(domainEntityExtensionReferenceProperty);
    domainEntityExtension.data.edfiOds.odsIdentityProperties.push(domainEntityExtensionReferenceProperty);
    const domainEntityExtensionCommonExtensionOverrideProperty: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonExtensionName,
      isRequired: true,
      parentEntity: domainEntityExtension,
      referencedEntity: commonExtension,
      isExtensionOverride: true,
      data: {
        edfiOds: {
          odsName: commonExtensionName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntityExtension.data.edfiOds.odsProperties.push(domainEntityExtensionCommonExtensionOverrideProperty);
    addEntityForNamespace(domainEntityExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create a table', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(2);
  });

  it('should create table for domain entity extension', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName)).toBeDefined();
  });

  it('should include create date column', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName) as Table).includeCreateDateColumn).toBe(
      true,
    );
  });

  it('should create common extension override join table', () => {
    expect(
      tableEntities(metaEd, extensionNamespace).get(`${domainEntityName + commonExtensionName}Extension`),
    ).toBeDefined();
  });
});

describe('when DomainEntityExtensionTableEnhancer enhances domain entity extension with common', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const commonName = 'CommonName';
  const domainEntityName = 'DomainEntityName';
  const domainEntityExtensionName = 'DomainEntityExtensionName';

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

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName,
      data: {
        edfiOds: {
          odsTableName: domainEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityPkPropertyName = 'DomainEntityPkPropertyName';
    const domainEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntity,
      data: {
        edfiOds: {
          odsName: domainEntityPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntity.data.edfiOds.odsProperties.push(domainEntityPkProperty);
    addEntityForNamespace(domainEntity);

    const domainEntityExtension: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityExtensionName,
      baseEntityName: domainEntityName,
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          odsTableName: domainEntityExtensionName,
          odsExtensionName: domainEntityExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityExtensionRequiredPropertyName = 'DomainEntityExtensionRequiredPropertyName';
    const domainEntityExtensionRequiredProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityExtensionRequiredPropertyName,
      isRequired: true,
      parentEntity: domainEntityExtension,
      data: {
        edfiOds: {
          odsName: domainEntityExtensionRequiredPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntityExtension.data.edfiOds.odsProperties.push(domainEntityExtensionRequiredProperty);
    const domainEntityExtensionReferencePropertyName = 'DomainEntityExtensionReferencePropertyName';
    const domainEntityExtensionReferenceProperty: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityExtensionReferencePropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntityExtension,
      referencedEntity: domainEntity,
      data: {
        edfiOds: {
          odsName: domainEntityExtensionReferencePropertyName,
          odsContextPrefix: '',
          odsDeleteCascadePrimaryKey: true,
        },
      },
    });
    domainEntityExtension.data.edfiOds.odsProperties.push(domainEntityExtensionReferenceProperty);
    domainEntityExtension.data.edfiOds.odsIdentityProperties.push(domainEntityExtensionReferenceProperty);
    const domainEntityExtensionCommonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonName,
      isRequired: true,
      parentEntity: domainEntityExtension,
      referencedEntity: common,
      isExtensionOverride: false,
      data: {
        edfiOds: {
          odsName: commonName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntityExtension.data.edfiOds.odsProperties.push(domainEntityExtensionCommonProperty);
    addEntityForNamespace(domainEntityExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(2);
  });

  it('should create a table for domain entity extension', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName)).toBeDefined();
  });

  it('should include create date column', () => {
    expect((tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName) as Table).includeCreateDateColumn).toBe(
      true,
    );
  });

  it('should create join table from domain entity and common', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntityName + commonName)).toBeDefined();
  });
});

describe('when DomainEntityExtensionTableEnhancer enhances domain entity extension with only common', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const commonName = 'CommonName';
  const domainEntityName = 'DomainEntityName';
  const domainEntityExtensionName = 'DomainEntityExtensionName';

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

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName,
      data: {
        edfiOds: {
          odsTableName: domainEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityPkPropertyName = 'DomainEntityPkPropertyName';
    const domainEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntity,
      data: {
        edfiOds: {
          odsName: domainEntityPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntity.data.edfiOds.odsProperties.push(domainEntityPkProperty);
    addEntityForNamespace(domainEntity);

    const domainEntityExtension: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityExtensionName,
      baseEntityName: domainEntityName,
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          odsTableName: domainEntityExtensionName,
          odsExtensionName: domainEntityExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityExtensionCommonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonName,
      isOptional: true,
      parentEntity: domainEntityExtension,
      referencedEntity: common,
      isExtensionOverride: false,
      data: {
        edfiOds: {
          odsName: commonName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntityExtension.data.edfiOds.odsProperties.push(domainEntityExtensionCommonProperty);
    addEntityForNamespace(domainEntityExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create one tables', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(1);
  });

  it('should not create a table for domain entity extension', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName)).toBeUndefined();
  });

  it('should create join table from domain entity and common', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntityName + commonName)).toBeDefined();
  });
});

describe('when DomainEntityExtensionTableEnhancer enhances domain entity extension with only commons', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const commonName1 = 'CommonName1';
  const commonName2 = 'CommonName2';
  const domainEntityName = 'DomainEntityName';
  const domainEntityExtensionName = 'DomainEntityExtensionName';

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

    const domainEntity: DomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: domainEntityName,
      data: {
        edfiOds: {
          odsTableName: domainEntityName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityPkPropertyName = 'DomainEntityPkPropertyName';
    const domainEntityPkProperty: IntegerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: domainEntityPkPropertyName,
      isPartOfIdentity: true,
      parentEntity: domainEntity,
      data: {
        edfiOds: {
          odsName: domainEntityPkPropertyName,
          odsContextPrefix: '',
        },
      },
    });
    domainEntity.data.edfiOds.odsProperties.push(domainEntityPkProperty);
    addEntityForNamespace(domainEntity);

    const domainEntityExtension: DomainEntityExtension = Object.assign(newDomainEntityExtension(), {
      namespace: extensionNamespace,
      metaEdName: domainEntityExtensionName,
      baseEntityName: domainEntityName,
      baseEntity: domainEntity,
      data: {
        edfiOds: {
          odsTableName: domainEntityExtensionName,
          odsExtensionName: domainEntityExtensionName,
          odsProperties: [],
          odsIdentityProperties: [],
        },
      },
    });
    const domainEntityExtensionCommonProperty: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonName1,
      isOptional: true,
      parentEntity: domainEntityExtension,
      referencedEntity: common,
      isExtensionOverride: false,
      data: {
        edfiOds: {
          odsName: commonName1,
          odsContextPrefix: '',
        },
      },
    });
    domainEntityExtension.data.edfiOds.odsProperties.push(domainEntityExtensionCommonProperty);
    const domainEntityExtensionCommonProperty2: CommonProperty = Object.assign(newCommonProperty(), {
      namespace: extensionNamespace,
      metaEdName: commonName2,
      isOptional: true,
      parentEntity: domainEntityExtension,
      referencedEntity: common,
      isExtensionOverride: false,
      data: {
        edfiOds: {
          odsName: commonName2,
          odsContextPrefix: '',
          odsIsCollection: true,
        },
      },
    });
    domainEntityExtension.data.edfiOds.odsProperties.push(domainEntityExtensionCommonProperty2);
    addEntityForNamespace(domainEntityExtension);

    metaEd.dataStandardVersion = '3.0.0';
    initializeEdFiOdsEntityRepository(metaEd);
    enhance(metaEd);
  });

  it('should create two tables', () => {
    expect(tableEntities(metaEd, extensionNamespace).size).toBe(2);
  });

  it('should not create a table for domain entity extension', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntityExtensionName)).toBeUndefined();
  });

  it('should create join table from domain entity and common', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntityName + commonName1)).toBeDefined();
  });

  it('should create join table from domain entity and common collection', () => {
    expect(tableEntities(metaEd, extensionNamespace).get(domainEntityName + commonName2)).toBeDefined();
  });
});
