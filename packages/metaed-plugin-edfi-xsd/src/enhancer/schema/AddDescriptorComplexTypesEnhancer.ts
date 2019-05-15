import { MetaEdEnvironment, EnhancerResult, Descriptor, SemVer } from 'metaed-core';
import { NoMapTypeEnumeration, versionSatisfies, V3OrGreater, getAllEntitiesOfType } from 'metaed-core';
import { ComplexType } from '../../model/schema/ComplexType';
import { newComplexType } from '../../model/schema/ComplexType';
import { newAnnotation } from '../../model/schema/Annotation';
import { newElement } from '../../model/schema/Element';
import { createSchemaComplexTypeItems } from './XsdElementFromPropertyCreator';
import { typeGroupDescriptor, baseTypeDescriptor } from './AddComplexTypesBaseEnhancer';

const enhancerName = 'AddDescriptorComplexTypesEnhancer';
const targetVersions: SemVer = V3OrGreater;

function createComplexType(descriptor: Descriptor): ComplexType[] {
  const complexType = Object.assign(newComplexType(), {
    annotation: Object.assign(newAnnotation(), {
      documentation: descriptor.documentation,
      typeGroup: typeGroupDescriptor,
    }),
    baseType: baseTypeDescriptor,
    name: descriptor.data.edfiXsd.xsdDescriptorNameWithExtension,
  });

  complexType.items.push(...createSchemaComplexTypeItems(descriptor.data.edfiXsd.xsdProperties()));
  if (descriptor.mapTypeEnumeration !== NoMapTypeEnumeration) {
    complexType.items.push(
      Object.assign(newElement(), {
        name: descriptor.mapTypeEnumeration.metaEdName,
        type: descriptor.mapTypeEnumeration.data.edfiXsd.xsdEnumerationNameWithExtension,
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

  (getAllEntitiesOfType(metaEd, 'descriptor') as Descriptor[]).forEach((descriptor: Descriptor) => {
    descriptor.data.edfiXsd.xsdComplexTypes = createComplexType(descriptor);
  });

  return {
    enhancerName,
    success: true,
  };
}
