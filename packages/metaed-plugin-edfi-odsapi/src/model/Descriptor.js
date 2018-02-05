// @flow
import type { MetaEdEnvironment, EnhancerResult, Descriptor } from 'metaed-core';
import { NoAggregate } from './domainMetadata/Aggregate';
import type { Aggregate } from './domainMetadata/Aggregate';

export type DescriptorEdfiOdsApi = {
  typeAggregate: Aggregate,
};

const enhancerName: string = 'DescriptorSetupEnhancer';

export function addDescriptorEdfiOdsApiTo(descriptor: Descriptor) {
  if (descriptor.data.edfiOdsApi == null) descriptor.data.edfiOdsApi = {};

  Object.assign(descriptor.data.edfiOdsApi, {
    typeAggregate: NoAggregate,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.descriptor.forEach((descriptor: Descriptor) => {
    addDescriptorEdfiOdsApiTo(descriptor);
  });

  return {
    enhancerName,
    success: true,
  };
}
