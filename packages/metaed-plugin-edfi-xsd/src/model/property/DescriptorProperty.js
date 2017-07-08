// @flow
import type { MetaEdEnvironment, EnhancerResult, DescriptorProperty } from '../../../../../packages/metaed-core/index';
import type { EntityPropertyEdfiXsd } from './EntityProperty';

export type DescriptorPropertyEdfiXsd = EntityPropertyEdfiXsd | {
  xsd_IsDescriptor: boolean,
  xsd_DescriptorName: string,
  xsd_DescriptorNameWithExtension: string,
}

// Enhancer for object setup
const enhancerName: string = 'DescriptorPropertySetupEnhancer';

export function addDescriptorPropertyEdfiXsd(property: DescriptorProperty) {
  Object.assign(property.data.edfiXsd, {
    xsd_IsDescriptor: true,
    xsd_DescriptorName: property.referencedEntity.data.xsd_DescriptorName,
    xsd_DescriptorNameWithExtension: property.referencedEntity.data.xsd_DescriptorNameWithExtension,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.descriptor.forEach((property: DescriptorProperty) => {
    addDescriptorPropertyEdfiXsd(property);
  });

  return {
    enhancerName,
    success: true,
  };
}
