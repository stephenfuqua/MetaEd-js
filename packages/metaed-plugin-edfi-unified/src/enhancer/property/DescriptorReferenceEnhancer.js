// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../metaed-core/index';

const enhancerName: string = 'DescriptorReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.descriptor.forEach(property => {
    const referencedEntity = metaEd.entity.descriptor.get(property.metaEdName);
    if (referencedEntity) property.referencedEntity = referencedEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
