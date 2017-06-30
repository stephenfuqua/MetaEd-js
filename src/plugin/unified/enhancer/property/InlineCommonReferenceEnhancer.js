// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../core/enhancer/EnhancerResult';

const enhancerName: string = 'InlineCommonReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.inlineCommon.forEach(property => {
    const referencedEntity = metaEd.entity.common.get(property.metaEdName);
    if (referencedEntity && referencedEntity.inlineInOds) property.referencedEntity = referencedEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
