// @flow
import { newMetaEdEnvironment, newCommon, newCommonExtension, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, CommonExtension, Namespace } from 'metaed-core';
import type { ComplexType } from '../../../src/model/schema/ComplexType';
import { NoComplexType } from '../../../src/model/schema/ComplexType';
import { addModelBaseEdfiXsdTo } from '../../../src/model/ModelBase';
import { enhance as initializeTopLevelEntities } from '../../../src/model/TopLevelEntity';
import { enhance } from '../../../src/enhancer/schema/AddCommonExtensionComplexTypesEnhancer';

describe('when enhancing common extension', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const baseTypeName: string = 'BaseTypeName';
  const complexTypeName: string = 'ComplexTypeName';
  const documentation: string = 'Documentation';
  let enhancedItem: CommonExtension;
  let createdComplexType: ComplexType;
  let createdReferenceType: ComplexType;
  let createdIdentityType: ComplexType;
  let createdLookupType: ComplexType;

  beforeAll(() => {
    const baseEntity = Object.assign(newCommon(), {
      namespace,
      metaEdName: baseTypeName,
      documentation,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(baseEntity);
    namespace.entity.common.set(baseEntity.metaEdName, baseEntity);

    enhancedItem = Object.assign(newCommonExtension(), {
      namespace,
      metaEdName: complexTypeName,
      documentation,
      baseEntity,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.commonExtension.set(enhancedItem.metaEdName, enhancedItem);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(enhancedItem.data.edfiXsd.xsd_ComplexTypes.length).toBe(1);
    [createdComplexType] = enhancedItem.data.edfiXsd.xsd_ComplexTypes;
    createdReferenceType = enhancedItem.data.edfiXsd.xsd_ReferenceType;
    createdIdentityType = enhancedItem.data.edfiXsd.xsd_IdentityType;
    createdLookupType = enhancedItem.data.edfiXsd.xsd_LookupType;
  });

  it('should create complex type', () => {
    expect(createdComplexType).toBeDefined();
  });

  it('should have annotation documentation assigned', () => {
    expect(createdComplexType.annotation).toBeDefined();
    expect(createdComplexType.annotation.documentation).toBe(documentation);
  });

  it('should have annotation type group assigned', () => {
    expect(createdComplexType.annotation.typeGroup).toBe('Common');
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

  it('should not create reference type', () => {
    expect(createdReferenceType).toBe(NoComplexType);
  });

  it('should not create identity type', () => {
    expect(createdIdentityType).toBe(NoComplexType);
  });

  it('should not create lookup type', () => {
    expect(createdLookupType).toBe(NoComplexType);
  });
});
