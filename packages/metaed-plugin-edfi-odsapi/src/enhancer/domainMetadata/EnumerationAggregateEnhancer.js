// @flow
import { getEntitiesOfType, asTopLevelEntity } from 'metaed-core';
import type { MetaEdEnvironment, ModelBase, EnhancerResult } from 'metaed-core';
import { enhanceSingleEntity } from './AggregateEnhancerBase';

const enhancerName: string = 'EnumerationAggregateEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity, 'enumeration').forEach((modelBase: ModelBase) => {
    enhanceSingleEntity(asTopLevelEntity(modelBase), metaEd.entity.namespaceInfo);
  });

  return {
    enhancerName,
    success: true,
  };
}
