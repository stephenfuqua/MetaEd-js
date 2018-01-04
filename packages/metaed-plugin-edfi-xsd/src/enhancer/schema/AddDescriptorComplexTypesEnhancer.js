// @flow
import { String as sugar } from 'sugar';
import type { MetaEdEnvironment, EnhancerResult, Descriptor } from 'metaed-core';
import { NoMapTypeEnumeration } from 'metaed-core';
import type { ComplexType } from '../../model/schema/ComplexType';
import { newComplexType } from '../../model/schema/ComplexType';
import { newAnnotation } from '../../model/schema/Annotation';
import { newElement } from '../../model/schema/Element';
import { createSchemaComplexTypeItems } from '../../enhancer/schema/XsdElementFromPropertyCreator';
import {
  typeGroupDescriptorExtendedReference,
  baseTypeDescriptorReference,
  typeGroupDescriptor,
  baseTypeDescriptor,
} from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddDescriptorComplexTypesEnhancer';

function createComplexType(descriptor: Descriptor): Array<ComplexType> {
  const complexType = Object.assign(newComplexType(), {
    annotation: Object.assign(newAnnotation(), {
      documentation: descriptor.documentation,
      typeGroup: typeGroupDescriptor,
    }),
    baseType: baseTypeDescriptor,
    name: descriptor.data.edfiXsd.xsd_DescriptorNameWithExtension,
  });

  complexType.items.push(...createSchemaComplexTypeItems(descriptor.data.edfiXsd.xsd_Properties()));
  if (descriptor.mapTypeEnumeration !== NoMapTypeEnumeration) {
    complexType.items.push(
      Object.assign(newElement(), {
        name: descriptor.mapTypeEnumeration.metaEdName,
        type: descriptor.mapTypeEnumeration.data.edfiXsd.xsd_EnumerationNameWithExtension,
        annotation: Object.assign(newAnnotation(), {
          documentation: `The mapping to a known ${descriptor.metaEdName} enumeration type.`,
        }),
        minOccurs: descriptor.isMapTypeOptional ? '0' : '',
      }),
    );
  }
  return [complexType];
}

function createReferenceType(descriptor: Descriptor): ComplexType {
  return Object.assign(newComplexType(), {
    annotation: Object.assign(newAnnotation(), {
      documentation: `Provides references for ${sugar.spacify(
        descriptor.data.edfiXsd.xsd_DescriptorName,
      )} and its details during interchange. Use XML IDREF to reference a record that is included in the interchange.`,
      typeGroup: typeGroupDescriptorExtendedReference,
    }),
    baseType: baseTypeDescriptorReference,
    name: `${descriptor.data.edfiXsd.xsd_DescriptorNameWithExtension}ReferenceType`,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.descriptor.forEach(descriptor => {
    descriptor.data.edfiXsd.xsd_ComplexTypes = createComplexType(descriptor);
    descriptor.data.edfiXsd.xsd_ReferenceType = createReferenceType(descriptor);
  });

  return {
    enhancerName,
    success: true,
  };
}
