import { MetaEdEnvironment, EnhancerResult, Descriptor } from 'metaed-core';
import { normalizeDescriptorSuffix, getAllEntitiesOfType } from 'metaed-core';

export type DescriptorEdfiOds = {
  odsDescriptorName: string;
  odsIsMapType: boolean;
};

const enhancerName = 'OdsDescriptorSetupEnhancer';

export function addDescriptorEdfiOdsTo(descriptor: Descriptor) {
  if (descriptor.data.edfiOds == null) descriptor.data.edfiOds = {};

  Object.assign(descriptor.data.edfiOds, {
    odsDescriptorName: normalizeDescriptorSuffix(descriptor.metaEdName),
    odsIsMapType: descriptor.isMapTypeRequired || descriptor.isMapTypeOptional,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'descriptor') as Array<Descriptor>).forEach((descriptor: Descriptor) => {
    addDescriptorEdfiOdsTo(descriptor);
  });

  return {
    enhancerName,
    success: true,
  };
}
