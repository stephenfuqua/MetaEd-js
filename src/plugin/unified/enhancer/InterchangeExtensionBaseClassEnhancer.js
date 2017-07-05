// @flow
import type { MetaEdEnvironment } from '../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../core/enhancer/EnhancerResult';

const enhancerName: string = 'InterchangeExtensionBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.interchangeExtension.forEach(childEntity => {
    const baseEntity = metaEd.entity.interchange.get(childEntity.baseEntityName);
    if (baseEntity) childEntity.baseEntity = baseEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
