// @flow
import type { MetaEdEnvironment, EnhancerResult, Descriptor, SemVer } from 'metaed-core';
import { versionSatisfies, V3OrGreater } from 'metaed-core';
import { newAnnotation } from '../../model/schema/Annotation';
import { newStringSimpleType } from '../../model/schema/StringSimpleType';
import type { StringSimpleType } from '../../model/schema/StringSimpleType';
import { typeGroupDescriptorExtendedReference, baseTypeDescriptorReference } from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddDescriptorExtendedReferenceTypesEnhancer';
const targetVersions: SemVer = V3OrGreater;

function createExtendedReferenceType(descriptor: Descriptor): StringSimpleType {
  const extendedReferenceType = Object.assign(newStringSimpleType(), {
    annotation: Object.assign(newAnnotation(), {
      documentation: descriptor.documentation,
      typeGroup: typeGroupDescriptorExtendedReference,
    }),
    baseType: baseTypeDescriptorReference,
    name: `${descriptor.data.edfiXsd.xsd_DescriptorNameWithExtension}ReferenceType`,
  });

  return extendedReferenceType;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  metaEd.entity.descriptor.forEach(descriptor => {
    descriptor.data.edfiXsd.xsd_DescriptorExtendedReferenceType = createExtendedReferenceType(descriptor);
  });

  return {
    enhancerName,
    success: true,
  };
}
