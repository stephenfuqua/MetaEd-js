// @flow
import type { MetaEdEnvironment, EnhancerResult, DescriptorProperty } from 'metaed-core';
import type { EntityPropertyEdfiXsd } from './EntityProperty';

export type DescriptorPropertyEdfiXsd = EntityPropertyEdfiXsd & {
  xsd_IsDescriptor: boolean,
  xsd_DescriptorName: () => string,
  xsd_DescriptorNameWithExtension: () => string,
}

// Enhancer for object setup
const enhancerName: string = 'DescriptorPropertySetupEnhancer';

function xsdDescriptorName(descriptorProperty: DescriptorProperty): () => string {
  return () => descriptorProperty.referencedEntity.data.edfiXsd.xsd_DescriptorName;
}

function xsdDescriptorNameWithExtension(descriptorProperty: DescriptorProperty): () => string {
  return () => descriptorProperty.referencedEntity.data.edfiXsd.xsd_DescriptorNameWithExtension;
}

export function addDescriptorPropertyEdfiXsdTo(property: DescriptorProperty) {
  if (property.data.edfiXsd == null) property.data.edfiXsd = {};

  Object.assign(property.data.edfiXsd, {
    xsd_IsDescriptor: true,
    xsd_DescriptorName: xsdDescriptorName(property),
    xsd_DescriptorNameWithExtension: xsdDescriptorNameWithExtension(property),
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.descriptor.forEach((property: DescriptorProperty) => {
    addDescriptorPropertyEdfiXsdTo(property);
  });

  return {
    enhancerName,
    success: true,
  };
}
