// @flow
import type { MetaEdEnvironment, EnhancerResult, InterchangeItem } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';

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
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  edFiXsdEntityRepository.mergedInterchange.forEach((mergedInterchange: MergedInterchange) => {
    addMergedInterchangeEdfiOdsApiTo(mergedInterchange);
  });

  return {
    enhancerName,
    success: true,
  };
}
