// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../packages/metaed-core/index';

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
