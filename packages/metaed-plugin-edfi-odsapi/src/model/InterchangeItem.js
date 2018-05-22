// @flow
import type { MetaEdEnvironment, EnhancerResult, InterchangeItem, Namespace } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';
import { edfiXsdRepositoryForNamespace } from 'metaed-plugin-edfi-xsd';

export type InterchangeItemEdfiOdsApi = {
  ...$Exact<InterchangeItem>,
  globalDependencyOrder: number,
};

const enhancerName: string = 'InterchangeItemSetupEnhancer';

export function addInterchangeItemEdfiOdsApiTo(interchangeItem: InterchangeItem) {
  if (interchangeItem.data.edfiOdsApi == null) interchangeItem.data.edfiOdsApi = {};

  Object.assign(interchangeItem.data.edfiOdsApi, {
    globalDependencyOrder: 0,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const edfiXsdEntityRepository: ?EdFiXsdEntityRepository = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edfiXsdEntityRepository == null) return;

    edfiXsdEntityRepository.mergedInterchange.forEach((mergedInterchange: MergedInterchange) => {
      mergedInterchange.elements.forEach((interchangeItem: InterchangeItem) => {
        addInterchangeItemEdfiOdsApiTo(interchangeItem);
      });
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
