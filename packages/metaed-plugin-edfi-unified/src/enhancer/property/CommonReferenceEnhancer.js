// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../metaed-core/index';

const enhancerName: string = 'CommonReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.common.forEach(property => {
    const referencedEntity = metaEd.entity.common.get(property.metaEdName);
    if (referencedEntity && !referencedEntity.inlineInOds) property.referencedEntity = referencedEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
