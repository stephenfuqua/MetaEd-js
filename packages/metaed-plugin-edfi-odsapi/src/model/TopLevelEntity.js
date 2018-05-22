// @flow
import type { MetaEdEnvironment, EnhancerResult, TopLevelEntity } from 'metaed-core';
import { getAllTopLevelEntitiesForNamespaces } from 'metaed-core';
import { NoAggregate } from './domainMetadata/Aggregate';
import type { Aggregate } from './domainMetadata/Aggregate';

export type TopLevelEntityEdfiOdsApi = {
  aggregate: Aggregate,
};

const enhancerName: string = 'TopLevelEntitySetupEnhancer';

export function addTopLevelEntityEdfiOdsApiTo(topLevelEntity: TopLevelEntity) {
  if (topLevelEntity.data.edfiOdsApi == null) topLevelEntity.data.edfiOdsApi = {};

  Object.assign(topLevelEntity.data.edfiOdsApi, {
    aggregate: NoAggregate,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllTopLevelEntitiesForNamespaces([...metaEd.namespace.values()]).forEach(entity => {
    addTopLevelEntityEdfiOdsApiTo(entity);
  });

  return {
    enhancerName,
    success: true,
  };
}
