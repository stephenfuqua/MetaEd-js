// @flow
import type { MetaEdEnvironment, EnhancerResult, InterchangeItem, Namespace } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';
import { edfiXsdRepositoryForNamespace } from 'metaed-plugin-edfi-xsd';

export type MergedInterchangeEdfiOdsApi = {
  ...$Exact<MergedInterchange>,
  apiOrder: number,
  apiOrderedElements: Array<InterchangeItem>,
};

const enhancerName: string = 'MergedInterchangeSetupEnhancer';

export function addMergedInterchangeEdfiOdsApiTo(mergedInterchange: MergedInterchange) {
  if (mergedInterchange.data.edfiOdsApi == null) mergedInterchange.data.edfiOdsApi = {};

  Object.assign(mergedInterchange.data.edfiOdsApi, {
    apiOrder: 0,
    apiOrderedElements: [],
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const edfiXsdEntityRepository: ?EdFiXsdEntityRepository = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edfiXsdEntityRepository == null) return;

    edfiXsdEntityRepository.mergedInterchange.forEach((mergedInterchange: MergedInterchange) => {
      addMergedInterchangeEdfiOdsApiTo(mergedInterchange);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
