import { MetaEdEnvironment, EnhancerResult, Descriptor } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { DescriptorEdfiXsd } from '../model/Descriptor';

const enhancerName = 'DescriptorPropertiesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'descriptor') as Array<Descriptor>).forEach((descriptor: Descriptor) => {
    const descriptorXsdData = descriptor.data.edfiXsd as DescriptorEdfiXsd;
    descriptorXsdData.xsdDescriptorName = `${descriptor.metaEdName}Descriptor`;
    descriptorXsdData.xsdDescriptorNameWithExtension = descriptor.namespace.projectExtension
      ? `${descriptor.namespace.projectExtension}-${descriptorXsdData.xsdDescriptorName}`
      : descriptorXsdData.xsdDescriptorName;
    descriptorXsdData.xsdIsMapType = descriptor.isMapTypeRequired || descriptor.isMapTypeOptional;
    descriptorXsdData.xsdHasPropertiesOrMapType = descriptorXsdData.xsdIsMapType || descriptor.properties.length > 0;
  });

  return {
    enhancerName,
    success: true,
  };
}
