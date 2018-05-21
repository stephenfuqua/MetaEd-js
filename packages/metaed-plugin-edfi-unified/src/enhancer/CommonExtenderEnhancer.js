// @flow
import type { MetaEdEnvironment, EnhancerResult, TopLevelEntity } from 'metaed-core';
import { asCommon, getAllEntitiesOfType, asTopLevelEntity } from 'metaed-core';

const enhancerName: string = 'CommonExtenderEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'commonExtension').forEach(entity => {
    const extensionEntity: TopLevelEntity = asTopLevelEntity(entity);
    if (extensionEntity.baseEntity) {
      asCommon(extensionEntity.baseEntity).extender = extensionEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
