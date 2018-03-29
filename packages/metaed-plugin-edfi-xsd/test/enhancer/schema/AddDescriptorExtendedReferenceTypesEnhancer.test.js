// @flow
import { newMetaEdEnvironment, newDescriptor } from 'metaed-core';
import type { MetaEdEnvironment, Descriptor } from 'metaed-core';
import type { StringSimpleType } from '../../../src/model/schema/StringSimpleType';
import { addModelBaseEdfiXsdTo } from '../../../src/model/ModelBase';
import { enhance as initializeTopLevelEntities } from '../../../src/model/TopLevelEntity';
import { enhance } from '../../../src/enhancer/schema/AddDescriptorExtendedReferenceTypesEnhancer';

describe('when enhancing descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const projectExtension: string = 'EXTENSION';
  const complexTypeName: string = 'Complex Type Name';
  const complexTypeDescriptorName: string = `${complexTypeName}Descriptor`;
  const complexTypeDescriptorNameWithExtension: string = `${projectExtension}-${complexTypeDescriptorName}`;
  const documentation: string = 'Documentation';
  let enhancedItem: Descriptor;
  let createdExtendedReferenceType: StringSimpleType;

  beforeAll(() => {
    enhancedItem = Object.assign(newDescriptor(), {
      metaEdName: complexTypeName,
      documentation,
      data: {
        edfiXsd: {
          xsd_DescriptorName: complexTypeDescriptorName,
          xsd_DescriptorNameWithExtension: complexTypeDescriptorNameWithExtension,
        },
      },
    });
    addModelBaseEdfiXsdTo(enhancedItem);
    metaEd.entity.descriptor.set(enhancedItem.metaEdName, enhancedItem);

    metaEd.dataStandardVersion = '3.0.0';
    initializeTopLevelEntities(metaEd);
    enhance(metaEd);

    createdExtendedReferenceType = enhancedItem.data.edfiXsd.xsd_DescriptorExtendedReferenceType;
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
