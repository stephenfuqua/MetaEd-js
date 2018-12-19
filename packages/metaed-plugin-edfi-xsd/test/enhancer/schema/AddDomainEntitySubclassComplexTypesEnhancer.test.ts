import {
  MetaEdEnvironment,
  DomainEntitySubclass,
  Namespace,
  newMetaEdEnvironment,
  newDomainEntity,
  newDomainEntitySubclass,
  newNamespace,
} from 'metaed-core';
import { ComplexType, NoComplexType } from '../../../src/model/schema/ComplexType';
import { addModelBaseEdfiXsdTo } from '../../../src/model/ModelBase';
import { enhance as initializeTopLevelEntities } from '../../../src/model/TopLevelEntity';
import { enhance } from '../../../src/enhancer/schema/AddDomainEntitySubclassComplexTypesEnhancer';

describe('when enhancing domainEntity subclass', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const baseTypeName = 'BaseTypeName';
  const complexTypeName = 'ComplexTypeName';
  const documentation = 'Documentation';
  let enhancedItem: DomainEntitySubclass;
  let createdComplexType: ComplexType;
  let createdReferenceType: ComplexType;
  let createdLookupType: ComplexType;
  let createdIdentityType: ComplexType;

  beforeAll(() => {
    const baseEntity = Object.assign(newDomainEntity(), {
      namespace,
      metaEdName: baseTypeName,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(baseEntity);
    namespace.entity.domainEntity.set(baseEntity.metaEdName, baseEntity);

    enhancedItem = Object.assign(newDomainEntitySubclass(), {
      namespace,
      metaEdName: complexTypeName,
      documentation,
      baseEntity,
      data: {
        edfiXsd: {},
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.domainEntitySubclass.set(enhancedItem.metaEdName, enhancedItem);

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
    expect(createdReferenceType).toBeDefined();
  });

  it('should not create identity type', () => {
    expect(createdIdentityType).toBe(NoComplexType);
  });

  it('should not create lookup type', () => {
    expect(createdLookupType).toBe(NoComplexType);
  });
});
