// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';

const enhancerName: string = 'CommonExtensionBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.commonExtension.forEach(childEntity => {
    const baseEntity = metaEd.entity.common.get(childEntity.baseEntityName);

    if (baseEntity) {
      childEntity.baseEntity = baseEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
