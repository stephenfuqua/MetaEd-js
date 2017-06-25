// @flow
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../packages/metaed-core/src/enhancer/EnhancerResult';

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
