// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../../packages/metaed-core/src/enhancer/EnhancerResult';

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
