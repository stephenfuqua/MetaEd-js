import { newMetaEdEnvironment, newDescriptor, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Descriptor, Namespace } from 'metaed-core';
import { StringSimpleType } from '../../../src/model/schema/StringSimpleType';
import { addModelBaseEdfiXsdTo } from '../../../src/model/ModelBase';
import { enhance as initializeTopLevelEntities } from '../../../src/model/TopLevelEntity';
import { enhance } from '../../../src/enhancer/schema/AddDescriptorExtendedReferenceTypesEnhancer';

describe('when enhancing descriptor', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const projectExtension = 'EXTENSION';
  const complexTypeName = 'Complex Type Name';
  const complexTypeDescriptorName: string = `${complexTypeName}Descriptor`;
  const complexTypeDescriptorNameWithExtension: string = `${projectExtension}-${complexTypeDescriptorName}`;
  const documentation = 'Documentation';
  let enhancedItem: Descriptor;
  let createdExtendedReferenceType: StringSimpleType;

  beforeAll(() => {
    enhancedItem = Object.assign(newDescriptor(), {
      metaEdName: complexTypeName,
      documentation,
      data: {
        edfiXsd: {
          xsdDescriptorName: complexTypeDescriptorName,
          xsdDescriptorNameWithExtension: complexTypeDescriptorNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    namespace.entity.descriptor.set(enhancedItem.metaEdName, enhancedItem);

    metaEd.dataStandardVersion = '3.0.0';
    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    createdExtendedReferenceType = enhancedItem.data.edfiXsd.xsdDescriptorExtendedReferenceType;
  });

  it('should create extended reference type', () => {
    expect(createdExtendedReferenceType).toBeDefined();
  });

  it('should have annotation documentation assigned', () => {
    expect(createdExtendedReferenceType.annotation).toBeDefined();
    expect(createdExtendedReferenceType.annotation.documentation).toBe(documentation);
  });

  it('should have annotation type group assigned', () => {
    expect(createdExtendedReferenceType.annotation.typeGroup).toBe('Extended Descriptor Reference');
  });

  it('should have base type assigned', () => {
    expect(createdExtendedReferenceType.baseType).toBe('DescriptorReferenceType');
  });

  it('should have name assigned', () => {
    expect(createdExtendedReferenceType.name).toBe(`${complexTypeDescriptorNameWithExtension}ReferenceType`);
  });
});
