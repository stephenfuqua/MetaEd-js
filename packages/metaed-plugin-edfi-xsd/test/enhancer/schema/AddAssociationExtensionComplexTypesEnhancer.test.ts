import {
  newMetaEdEnvironment,
  newAssociation,
  newAssociationExtension,
  newAssociationSubclass,
  newNamespace,
  newCommon,
  newCommonExtension,
  newCommonProperty,
  newStringProperty,
} from 'metaed-core';
import { MetaEdEnvironment, AssociationExtension, Namespace } from 'metaed-core';
import { Element } from '../../../src/model/schema/Element';
import { ComplexType } from '../../../src/model/schema/ComplexType';
import { NoComplexType } from '../../../src/model/schema/ComplexType';
import { addModelBaseEdfiXsdTo } from '../../../src/model/ModelBase';
import { restrictionSuffix } from '../../../src/enhancer/schema/AddComplexTypesBaseEnhancer';
import { enhance as initializeTopLevelEntities } from '../../../src/model/TopLevelEntity';
import { enhance } from '../../../src/enhancer/schema/AddAssociationExtensionComplexTypesEnhancer';

describe('when enhancing association extension', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const baseTypeName = 'BaseTypeName';
  const complexTypeName = 'ComplexTypeName';
  const documentation = 'Documentation';
  let enhancedItem: AssociationExtension;
  let createdComplexType: ComplexType;
  let createdReferenceType: ComplexType;
  let createdIdentityType: ComplexType;

  beforeAll(() => {
    const baseEntity = Object.assign(newAssociation(), {
      namespace,
      metaEdName: baseTypeName,
      documentation,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(baseEntity);
    namespace.entity.association.set(baseEntity.metaEdName, baseEntity);

    enhancedItem = Object.assign(newAssociationExtension(), {
      namespace,
      metaEdName: complexTypeName,
      documentation,
      baseEntity,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.associationExtension.set(enhancedItem.metaEdName, enhancedItem);

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
    expect(createdComplexType.annotation.typeGroup).toBe('Association');
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

describe('when enhancing association extension with common type override', () => {
  const projectExtension = 'EXTENSION';
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = {
    ...newNamespace(),
    namespaceName: 'Extension',
    projectExtension,
    isExtension: true,
  };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const baseAssociationName = 'BaseAssociationName';
  const associationExtensionName = 'AssociationExtensionName';
  const baseCommonTypeName = 'BaseCommonTypeName';
  const commonTypeExtensionName = 'CommonTypeExtensionName';
  const otherPropertyOnExtensionName = 'OtherPropertyOnExtensionName';
  const otherPropertyOnAssociationName = 'OtherPropertyOnAssociationName';

  const documentation = 'Documentation';
  let createdRestrictionComplexType: ComplexType;
  let createdExtensionComplexType: ComplexType;

  beforeAll(() => {
    const baseCommon = Object.assign(newCommon(), {
      namespace,
      metaEdName: baseCommonTypeName,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(baseCommon);
    extensionNamespace.entity.common.set(baseCommon.metaEdName, baseCommon);

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
    extensionNamespace.entity.commonExtension.set(commonExtension.metaEdName, commonExtension);

    const baseAssociation = Object.assign(newAssociation(), {
      namespace,
      metaEdName: baseAssociationName,
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
          metaEdName: otherPropertyOnAssociationName,
          data: {
            edfiXsd: {
              xsdName: otherPropertyOnAssociationName,
            },
          },
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(baseAssociation);
    extensionNamespace.entity.association.set(baseAssociation.metaEdName, baseAssociation);

    const associationExtension = Object.assign(newAssociationExtension(), {
      metaEdName: associationExtensionName,
      documentation,
      baseEntity: baseAssociation,
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
    addModelBaseEdfiXsdTo(associationExtension);
    extensionNamespace.entity.associationExtension.set(associationExtension.metaEdName, associationExtension);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(associationExtension.data.edfiXsd.xsdComplexTypes.length).toBe(2);
    [createdRestrictionComplexType, createdExtensionComplexType] = associationExtension.data.edfiXsd.xsdComplexTypes;
  });

  it('should have annotation documentation assigned on extension complex type', () => {
    expect(createdExtensionComplexType.annotation).toBeDefined();
    expect(createdExtensionComplexType.annotation.documentation).toBe(documentation);
  });

  it('should have annotation type group assigned on extension complex type', () => {
    expect(createdExtensionComplexType.annotation.typeGroup).toBe('Association');
  });

  it('should have base type assigned on extension complex type', () => {
    expect(createdExtensionComplexType.baseType).toBe(`${projectExtension}-${baseAssociationName}${restrictionSuffix}`);
  });

  it('should have name assigned on extension complex type', () => {
    expect(createdExtensionComplexType.name).toBe(`${projectExtension}-${associationExtensionName}`);
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
    expect(createdRestrictionComplexType.baseType).toBe(baseAssociationName);
  });

  it('should have name assigned on restriction complex type', () => {
    expect(createdRestrictionComplexType.name).toBe(`${projectExtension}-${baseAssociationName}${restrictionSuffix}`);
  });

  it('should have items on restriction complex type', () => {
    expect(createdRestrictionComplexType.items.length).toBe(1);
    expect((createdRestrictionComplexType.items[0] as Element).name).toBe(otherPropertyOnAssociationName);
  });
});

describe('when enhancing association extension of a association subclass with common type override', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const projectExtension = 'EXTENSION';
  const associationSubclassName = 'AssociationSubclassName';
  const baseAssociationName = 'BaseAssociationName';
  const basePropertyOnAssociationName = 'BasePropertyOnAssociationName';
  const associationExtensionName = 'AssociationExtensionName';
  const baseCommonTypeName = 'BaseCommonTypeName';
  const commonTypeExtensionName = 'CommonTypeExtensionName';
  const otherPropertyOnExtensionName = 'OtherPropertyOnExtensionName';
  const otherPropertyOnAssociationName = 'OtherPropertyOnAssociationName';

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

    const baseAssociation = Object.assign(newAssociation(), {
      namespace,
      metaEdName: baseAssociationName,
      properties: [
        Object.assign(newStringProperty(), {
          metaEdName: basePropertyOnAssociationName,
          data: {
            edfiXsd: {
              xsdName: basePropertyOnAssociationName,
            },
          },
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(baseAssociation);
    namespace.entity.association.set(baseAssociation.metaEdName, baseAssociation);

    const associationSubclass = Object.assign(newAssociationSubclass(), {
      namespace,
      metaEdName: associationSubclassName,
      baseEntity: baseAssociation,
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
          metaEdName: otherPropertyOnAssociationName,
          data: {
            edfiXsd: {
              xsdName: otherPropertyOnAssociationName,
            },
          },
        }),
      ],
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(associationSubclass);
    namespace.entity.associationSubclass.set(associationSubclass.metaEdName, associationSubclass);

    const associationExtension = Object.assign(newAssociationExtension(), {
      metaEdName: associationExtensionName,
      documentation,
      baseEntity: associationSubclass,
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
    addModelBaseEdfiXsdTo(associationExtension);
    namespace.entity.associationExtension.set(associationExtension.metaEdName, associationExtension);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(associationExtension.data.edfiXsd.xsdComplexTypes.length).toBe(2);
    [createdRestrictionComplexType, createdExtensionComplexType] = associationExtension.data.edfiXsd.xsdComplexTypes;
  });

  it('should have annotation documentation assigned on extension complex type', () => {
    expect(createdExtensionComplexType.annotation).toBeDefined();
    expect(createdExtensionComplexType.annotation.documentation).toBe(documentation);
  });

  it('should have annotation type group assigned on extension complex type', () => {
    expect(createdExtensionComplexType.annotation.typeGroup).toBe('Association');
  });

  it('should have base type assigned on extension complex type', () => {
    expect(createdExtensionComplexType.baseType).toBe(`${projectExtension}-${associationSubclassName}${restrictionSuffix}`);
  });

  it('should have name assigned on extension complex type', () => {
    expect(createdExtensionComplexType.name).toBe(`${projectExtension}-${associationExtensionName}`);
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
    expect(createdRestrictionComplexType.baseType).toBe(associationSubclassName);
  });

  it('should have name assigned on restriction complex type', () => {
    expect(createdRestrictionComplexType.name).toBe(`${projectExtension}-${associationSubclassName}${restrictionSuffix}`);
  });

  it('should have items on restriction complex type from both base and subclass', () => {
    expect(createdRestrictionComplexType.items.length).toBe(2);
    expect((createdRestrictionComplexType.items[0] as Element).name).toBe(basePropertyOnAssociationName);
    expect((createdRestrictionComplexType.items[1] as Element).name).toBe(otherPropertyOnAssociationName);
  });
});
