import { MetaEdEnvironment, EnhancerResult, Descriptor } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import { NoAggregate } from './domainMetadata/Aggregate';
import { Aggregate } from './domainMetadata/Aggregate';

export type DescriptorEdfiOdsApi = {
  typeAggregate: Aggregate;
};

const enhancerName = 'DescriptorSetupEnhancer';

export function addDescriptorEdfiOdsApiTo(descriptor: Descriptor) {
  if (descriptor.data.edfiOdsApi == null) descriptor.data.edfiOdsApi = {};

  Object.assign(descriptor.data.edfiOdsApi, {
    typeAggregate: NoAggregate,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'descriptor') as Array<Descriptor>).forEach((descriptor: Descriptor) => {
    addDescriptorEdfiOdsApiTo(descriptor);
  });

  return {
    enhancerName,
    success: true,
  };
}
