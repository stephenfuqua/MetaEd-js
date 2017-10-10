// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../metaed-core/index';

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
