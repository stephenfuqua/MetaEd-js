import { newMetaEdEnvironment, newAssociation, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Association, Namespace } from 'metaed-core';
import { ComplexType } from '../../../src/model/schema/ComplexType';
import { NoComplexType } from '../../../src/model/schema/ComplexType';
import { addModelBaseEdfiXsdTo } from '../../../src/model/ModelBase';
import { enhance as initializeTopLevelEntities } from '../../../src/model/TopLevelEntity';
import { enhance } from '../../../src/enhancer/schema/AddAssociationComplexTypesEnhancer';

describe('when enhancing association', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const complexTypeName = 'ComplexTypeName';
  const documentation = 'Documentation';
  let enhancedItem: Association;
  let createdComplexType: ComplexType;
  let createdReferenceType: ComplexType;
  let createdLookupType: ComplexType;
  let createdIdentityType: ComplexType;

  beforeAll(() => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
    metaEd.namespace.set(namespace.namespaceName, namespace);

    enhancedItem = Object.assign(newAssociation(), {
      namespace,
      metaEdName: complexTypeName,
      documentation,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.association.set(enhancedItem.metaEdName, enhancedItem);

    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    expect(enhancedItem.data.edfiXsd.xsdComplexTypes.length).toBe(1);
    [createdComplexType] = enhancedItem.data.edfiXsd.xsdComplexTypes;
    createdReferenceType = enhancedItem.data.edfiXsd.xsdReferenceType;
    createdLookupType = enhancedItem.data.edfiXsd.xsdLookupType;
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
    expect(createdComplexType.baseType).toBe('ComplexObjectType');
  });

  it('should have name assigned', () => {
    expect(createdComplexType.name).toBe(complexTypeName);
  });

  it('should not have items', () => {
    expect(createdComplexType.items.length).toBe(0);
  });

  it('should create reference type', () => {
    expect(createdReferenceType).toBeDefined();
  });

  it('should not create identity type', () => {
    expect(createdIdentityType).toBe(NoComplexType);
  });

  it('should not create lookup type', () => {
    expect(createdLookupType).toBe(NoComplexType);
  });
});
