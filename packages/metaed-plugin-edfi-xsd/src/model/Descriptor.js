// @flow
import type { MetaEdEnvironment, EnhancerResult, Descriptor } from 'metaed-core';
import type { StringSimpleType } from './schema/StringSimpleType';
import { NoStringSimpleType } from './schema/StringSimpleType';

export type DescriptorEdfiXsd = {
  xsd_DescriptorName: string,
  xsd_DescriptorNameWithExtension: string,
  xsd_IsMapType: boolean,
  xsd_HasPropertiesOrMapType: boolean,
  xsd_DescriptorExtendedReferenceType: StringSimpleType,
};

const enhancerName: string = 'DescriptorSetupEnhancer';

export function addDescriptorEdfiXsdTo(descriptor: Descriptor) {
  if (descriptor.data.edfiXsd == null) descriptor.data.edfiXsd = {};

  Object.assign(descriptor.data.edfiXsd, {
    xsd_DescriptorName: '',
    xsd_DescriptorNameWithExtension: '',
    xsd_IsMapType: false,
    xsd_HasPropertiesOrMapType: false,
    xsd_DescriptorExtendedReferenceType: NoStringSimpleType,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.descriptor.forEach((descriptor: Descriptor) => {
    addDescriptorEdfiXsdTo(descriptor);
  });

  return {
    enhancerName,
    success: true,
  };
}
