// @flow
import { getEntitiesOfType, asTopLevelEntity } from 'metaed-core';
import type { MetaEdEnvironment, ModelBase, EnhancerResult } from 'metaed-core';
import { enhanceSingleEntity } from './AggregateEnhancerBase';

const enhancerName: string = 'SchoolYearEnumerationAggregateEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity, 'schoolYearEnumeration').forEach((modelBase: ModelBase) => {
    enhanceSingleEntity(asTopLevelEntity(modelBase), metaEd.entity.namespaceInfo);
  });

  return {
    enhancerName,
    success: true,
  };
}
