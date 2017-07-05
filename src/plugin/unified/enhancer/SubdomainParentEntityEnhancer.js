// @flow
import type { MetaEdEnvironment } from '../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../core/enhancer/EnhancerResult';

const enhancerName: string = 'SubdomainParentEntityEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.subdomain.forEach(childEntity => {
    const parent = metaEd.entity.domain.get(childEntity.parentMetaEdName);
    if (parent) childEntity.parent = parent;
  });

  return {
    enhancerName,
    success: true,
  };
}
