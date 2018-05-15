// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { asCommon, getAllEntitiesOfType } from 'metaed-core';

const enhancerName: string = 'CommonExtenderEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'commonExtension').forEach(extensionEntity => {
    if (extensionEntity.baseEntity) {
      asCommon(extensionEntity.baseEntity).extender = extensionEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
