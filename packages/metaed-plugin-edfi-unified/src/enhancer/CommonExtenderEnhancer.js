// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { asCommon } from 'metaed-core';

const enhancerName: string = 'CommonExtenderEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.commonExtension.forEach(extensionEntity => {
    if (extensionEntity.baseEntity) {
      asCommon(extensionEntity.baseEntity).extender = extensionEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
