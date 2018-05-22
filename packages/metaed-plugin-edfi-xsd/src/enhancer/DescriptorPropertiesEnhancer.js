// @flow
import type { MetaEdEnvironment, EnhancerResult, Descriptor } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import type { DescriptorEdfiXsd } from '../model/Descriptor';

const enhancerName: string = 'DescriptorPropertiesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'descriptor').forEach((descriptor: Descriptor) => {
    const descriptorXsdData = ((descriptor.data.edfiXsd: any): DescriptorEdfiXsd);
    descriptorXsdData.xsd_DescriptorName = `${descriptor.metaEdName}Descriptor`;
    descriptorXsdData.xsd_DescriptorNameWithExtension = descriptor.namespace.projectExtension
      ? `${descriptor.namespace.projectExtension}-${descriptorXsdData.xsd_DescriptorName}`
      : descriptorXsdData.xsd_DescriptorName;
    descriptorXsdData.xsd_IsMapType = descriptor.isMapTypeRequired || descriptor.isMapTypeOptional;
    descriptorXsdData.xsd_HasPropertiesOrMapType = descriptorXsdData.xsd_IsMapType || descriptor.properties.length > 0;
  });

  return {
    enhancerName,
    success: true,
  };
}
