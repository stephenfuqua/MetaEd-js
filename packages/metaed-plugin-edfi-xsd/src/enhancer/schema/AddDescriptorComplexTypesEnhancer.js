// @flow
import type { MetaEdEnvironment, EnhancerResult, Descriptor, SemVer } from 'metaed-core';
import { NoMapTypeEnumeration, versionSatisfies, V3OrGreater, getAllEntitiesOfType } from 'metaed-core';
import type { ComplexType } from '../../model/schema/ComplexType';
import { newComplexType } from '../../model/schema/ComplexType';
import { newAnnotation } from '../../model/schema/Annotation';
import { newElement } from '../../model/schema/Element';
import { createSchemaComplexTypeItems } from '../../enhancer/schema/XsdElementFromPropertyCreator';
import { typeGroupDescriptor, baseTypeDescriptor } from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddDescriptorComplexTypesEnhancer';
const targetVersions: SemVer = V3OrGreater;

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

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  ((getAllEntitiesOfType(metaEd, 'descriptor'): any): Array<Descriptor>).forEach((descriptor: Descriptor) => {
    descriptor.data.edfiXsd.xsd_ComplexTypes = createComplexType(descriptor);
  });

  return {
    enhancerName,
    success: true,
  };
}
