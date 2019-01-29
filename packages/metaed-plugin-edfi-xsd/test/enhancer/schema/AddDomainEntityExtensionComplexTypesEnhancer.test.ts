import {
  MetaEdEnvironment,
  DomainEntityExtension,
  Namespace,
  newMetaEdEnvironment,
  newDomainEntity,
  newDomainEntityExtension,
  newDomainEntitySubclass,
  newNamespace,
  newCommon,
  newCommonExtension,
  newCommonProperty,
  newStringProperty,
} from 'metaed-core';
import { Element } from '../../../src/model/schema/Element';
import { ComplexType, NoComplexType } from '../../../src/model/schema/ComplexType';
import { addModelBaseEdfiXsdTo } from '../../../src/model/ModelBase';
import { restrictionSuffix } from '../../../src/enhancer/schema/AddComplexTypesBaseEnhancer';
import { enhance as initializeTopLevelEntities } from '../../../src/model/TopLevelEntity';
import { enhance } from '../../../src/enhancer/schema/AddDomainEntityExtensionComplexTypesEnhancer';

describe('when enhancing domainEntity extension', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const baseTypeName = 'BaseTypeName';
  const complexTypeName = 'ComplexTypeName';
  const documentation = 'Documentation';
  let enhancedItem: DomainEntityExtension;
  let createdComplexType: ComplexType;
  let createdReferenceType: ComplexType;
  let createdIdentityType: ComplexType;

  beforeAll(() => {
    const baseEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: baseTypeName,
      documentation,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(baseEntity);
    namespace.entity.domainEntity.set(baseEntity.metaEdName, baseEntity);

    enhancedItem = Object.assign(newDomainEntityExtension(), {
      namespace,
      metaEdName: complexTypeName,
      documentation,
      baseEntity,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.domainEntityExtension.set(enhancedItem.metaEdName, enhancedItem);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(enhancedItem.data.edfiXsd.xsdComplexTypes.length).toBe(1);
    [createdComplexType] = enhancedItem.data.edfiXsd.xsdComplexTypes;
    createdReferenceType = enhancedItem.data.edfiXsd.xsdReferenceType;
    createdIdentityType = enhancedItem.data.edfiXsd.xsdIdentityType;
  });

  it('should create complex type', () => {
    expect(createdComplexType).toBeDefined();
  });

  it('should have annotation documentation assigned', () => {
    expect(createdComplexType.annotation).toBeDefined();
    expect(createdComplexType.annotation.documentation).toBe(documentation);
  });

  it('should have annotation type group assigned', () => {
    expect(createdComplexType.annotation.typeGroup).toBe('Domain Entity');
  });

  it('should have base type assigned', () => {
    expect(createdComplexType.baseType).toBe(baseTypeName);
  });

  it('should have name assigned', () => {
    expect(createdComplexType.name).toBe(complexTypeName);
  });

  it('should not have items', () => {
    expect(createdComplexType.items.length).toBe(0);
  });

  it('should create reference type', () => {
    expect(createdReferenceType).toBe(NoComplexType);
  });

  it('should not create identity type', () => {
    expect(createdIdentityType).toBe(NoComplexType);
  });
});

describe('when enhancing domainEntity extension with common type override', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const projectExtension = 'EXTENSION';
  const baseDomainEntityName = 'BaseDomainEntityName';
  const domainEntityExtensionName = 'DomainEntityExtensionName';
  const baseCommonTypeName = 'BaseCommonTypeName';
  const commonTypeExtensionName = 'CommonTypeExtensionName';
  const otherPropertyOnExtensionName = 'OtherPropertyOnExtensionName';
  const otherPropertyOnDomainEntityName = 'OtherPropertyOnDomainEntityName';

  const documentation = 'Documentation';
  let createdRestrictionComplexType: ComplexType;
  let createdExtensionComplexType: ComplexType;

  beforeAll(() => {
    const extensionNamespace = Object.assign(newNamespace(), {
      namespaceName: 'Extension',
      projectExtension,
      isExtension: true,
    });
    metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);

    const baseCommon = Object.assign(newCommon(), {
      namespace,
      metaEdName: baseCommonTypeName,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(baseCommon);
    namespace.entity.common.set(baseCommon.metaEdName, baseCommon);

    const commonExtension = Object.assign(newCommonExtension(), {
      metaEdName: commonTypeExtensionName,
      baseEntityName: baseCommonTypeName,
      baseEntity: baseCommon,
      namespace: extensionNamespace,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(commonExtension);
    namespace.entity.commonExtension.set(commonExtension.metaEdName, commonExtension);

    const baseDomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: baseDomainEntityName,
      properties: [
        Object.assign(newCommonProperty(), {
          metaEdName: baseCommonTypeName,
          isExtensionOverride: false,
          data: {
            edfiXsd: {
              xsdName: baseCommonTypeName,
            },
          },
        }),
        Object.assign(newStringProperty(), {
          metaEdName: otherPropertyOnDomainEntityName,
          data: {
            edfiXsd: {
              xsdName: otherPropertyOnDomainEntityName,
            },
          },
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(baseDomainEntity);
    namespace.entity.domainEntity.set(baseDomainEntity.metaEdName, baseDomainEntity);

    const domainEntityExtension = Object.assign(newDomainEntityExtension(), {
      metaEdName: domainEntityExtensionName,
      documentation,
      baseEntity: baseDomainEntity,
      namespace: extensionNamespace,
      properties: [
        Object.assign(newCommonProperty(), {
          metaEdName: baseCommonTypeName,
          isExtensionOverride: true,
          data: {
            edfiXsd: {
              xsdName: baseCommonTypeName,
            },
          },
        }),
        Object.assign(newStringProperty(), {
          metaEdName: otherPropertyOnExtensionName,
          data: {
            edfiXsd: {
              xsdName: otherPropertyOnExtensionName,
            },
          },
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(domainEntityExtension);
    namespace.entity.domainEntityExtension.set(domainEntityExtension.metaEdName, domainEntityExtension);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(domainEntityExtension.data.edfiXsd.xsdComplexTypes.length).toBe(2);
    [createdRestrictionComplexType, createdExtensionComplexType] = domainEntityExtension.data.edfiXsd.xsdComplexTypes;
  });

  it('should have annotation documentation assigned on extension complex type', () => {
    expect(createdExtensionComplexType.annotation).toBeDefined();
    expect(createdExtensionComplexType.annotation.documentation).toBe(documentation);
  });

  it('should have annotation type group assigned on extension complex type', () => {
    expect(createdExtensionComplexType.annotation.typeGroup).toBe('Domain Entity');
  });

  it('should have base type assigned on extension complex type', () => {
    expect(createdExtensionComplexType.baseType).toBe(`${projectExtension}-${baseDomainEntityName}${restrictionSuffix}`);
  });

  it('should have name assigned on extension complex type', () => {
    expect(createdExtensionComplexType.name).toBe(`${projectExtension}-${domainEntityExtensionName}`);
  });

  it('should have items on extension complex type', () => {
    expect(createdExtensionComplexType.items.length).toBe(2);
    expect((createdExtensionComplexType.items[0] as Element).name).toBe(baseCommonTypeName);
    expect((createdExtensionComplexType.items[1] as Element).name).toBe(otherPropertyOnExtensionName);
  });

  it('should have annotation documentation assigned on restriction complex type', () => {
    expect(createdRestrictionComplexType.annotation).toBeDefined();
    expect(createdRestrictionComplexType.annotation.documentation).toMatchSnapshot();
  });

  it('should not have annotation type group assigned on restriction complex type', () => {
    expect(createdRestrictionComplexType.annotation.typeGroup).toBe('');
  });

  it('should have base type assigned on restriction complex type', () => {
    expect(createdRestrictionComplexType.baseType).toBe(baseDomainEntityName);
  });

  it('should have name assigned on restriction complex type', () => {
    expect(createdRestrictionComplexType.name).toBe(`${projectExtension}-${baseDomainEntityName}${restrictionSuffix}`);
  });

  it('should have items on restriction complex type', () => {
    expect(createdRestrictionComplexType.items.length).toBe(1);
    expect((createdRestrictionComplexType.items[0] as Element).name).toBe(otherPropertyOnDomainEntityName);
  });
});

describe('when enhancing domainEntity extension of a domain entity subclass with common type override', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const projectExtension = 'EXTENSION';
  const domainEntitySubclassName = 'DomainEntitySubclassName';
  const baseDomainEntityName = 'BaseDomainEntityName';
  const basePropertyOnDomainEntityName = 'BasePropertyOnDomainEntityName';
  const domainEntityExtensionName = 'DomainEntityExtensionName';
  const baseCommonTypeName = 'BaseCommonTypeName';
  const commonTypeExtensionName = 'CommonTypeExtensionName';
  const otherPropertyOnExtensionName = 'OtherPropertyOnExtensionName';
  const otherPropertyOnDomainEntityName = 'OtherPropertyOnDomainEntityName';

  const documentation = 'Documentation';
  let createdRestrictionComplexType: ComplexType;
  let createdExtensionComplexType: ComplexType;

  beforeAll(() => {
    const extensionNamespace = Object.assign(newNamespace(), {
      namespaceName: 'Extension',
      projectExtension,
      isExtension: true,
    });
    metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);

    const baseCommon = Object.assign(newCommon(), {
      namespace,
      metaEdName: baseCommonTypeName,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(baseCommon);
    namespace.entity.common.set(baseCommon.metaEdName, baseCommon);

    const commonExtension = Object.assign(newCommonExtension(), {
      metaEdName: commonTypeExtensionName,
      baseEntityName: baseCommonTypeName,
      baseEntity: baseCommon,
      namespace: extensionNamespace,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(commonExtension);
    namespace.entity.commonExtension.set(commonExtension.metaEdName, commonExtension);

    const baseDomainEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: baseDomainEntityName,
      properties: [
        Object.assign(newStringProperty(), {
          metaEdName: basePropertyOnDomainEntityName,
          data: {
            edfiXsd: {
              xsdName: basePropertyOnDomainEntityName,
            },
          },
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(baseDomainEntity);
    namespace.entity.domainEntity.set(baseDomainEntity.metaEdName, baseDomainEntity);

    const domainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      namespace,
      metaEdName: domainEntitySubclassName,
      baseEntity: baseDomainEntity,
      properties: [
        Object.assign(newCommonProperty(), {
          metaEdName: baseCommonTypeName,
          isExtensionOverride: false,
          data: {
            edfiXsd: {
              xsdName: baseCommonTypeName,
            },
          },
        }),
        Object.assign(newStringProperty(), {
          metaEdName: otherPropertyOnDomainEntityName,
          data: {
            edfiXsd: {
              xsdName: otherPropertyOnDomainEntityName,
            },
          },
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(domainEntitySubclass);
    namespace.entity.domainEntitySubclass.set(domainEntitySubclass.metaEdName, domainEntitySubclass);

    const domainEntityExtension = Object.assign(newDomainEntityExtension(), {
      metaEdName: domainEntityExtensionName,
      documentation,
      baseEntity: domainEntitySubclass,
      namespace: extensionNamespace,
      properties: [
        Object.assign(newCommonProperty(), {
          metaEdName: baseCommonTypeName,
          isExtensionOverride: true,
          data: {
            edfiXsd: {
              xsdName: baseCommonTypeName,
            },
          },
        }),
        Object.assign(newStringProperty(), {
          metaEdName: otherPropertyOnExtensionName,
          data: {
            edfiXsd: {
              xsdName: otherPropertyOnExtensionName,
            },
          },
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(domainEntityExtension);
    namespace.entity.domainEntityExtension.set(domainEntityExtension.metaEdName, domainEntityExtension);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(domainEntityExtension.data.edfiXsd.xsdComplexTypes.length).toBe(2);
    [createdRestrictionComplexType, createdExtensionComplexType] = domainEntityExtension.data.edfiXsd.xsdComplexTypes;
  });

  it('should have annotation documentation assigned on extension complex type', () => {
    expect(createdExtensionComplexType.annotation).toBeDefined();
    expect(createdExtensionComplexType.annotation.documentation).toBe(documentation);
  });

  it('should have annotation type group assigned on extension complex type', () => {
    expect(createdExtensionComplexType.annotation.typeGroup).toBe('Domain Entity');
  });

  it('should have base type assigned on extension complex type', () => {
    expect(createdExtensionComplexType.baseType).toBe(`${projectExtension}-${domainEntitySubclassName}${restrictionSuffix}`);
  });

  it('should have name assigned on extension complex type', () => {
    expect(createdExtensionComplexType.name).toBe(`${projectExtension}-${domainEntityExtensionName}`);
  });

  it('should have items on extension complex type', () => {
    expect(createdExtensionComplexType.items.length).toBe(2);
    expect((createdExtensionComplexType.items[0] as Element).name).toBe(baseCommonTypeName);
    expect((createdExtensionComplexType.items[1] as Element).name).toBe(otherPropertyOnExtensionName);
  });

  it('should have annotation documentation assigned on restriction complex type', () => {
    expect(createdRestrictionComplexType.annotation).toBeDefined();
    expect(createdRestrictionComplexType.annotation.documentation).toMatchSnapshot();
  });

  it('should not have annotation type group assigned on restriction complex type', () => {
    expect(createdRestrictionComplexType.annotation.typeGroup).toBe('');
  });

  it('should have base type assigned on restriction complex type', () => {
    expect(createdRestrictionComplexType.baseType).toBe(domainEntitySubclassName);
  });

  it('should have name assigned on restriction complex type', () => {
    expect(createdRestrictionComplexType.name).toBe(`${projectExtension}-${domainEntitySubclassName}${restrictionSuffix}`);
  });

  it('should have items on restriction complex type from both base and subclass', () => {
    expect(createdRestrictionComplexType.items.length).toBe(2);
    expect((createdRestrictionComplexType.items[0] as Element).name).toBe(basePropertyOnDomainEntityName);
    expect((createdRestrictionComplexType.items[1] as Element).name).toBe(otherPropertyOnDomainEntityName);
  });
});
