// @flow
import type { MetaEdEnvironment, EnhancerResult, InterchangeItem, Namespace } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';
import { edfiXsdRepositoryForNamespace } from 'metaed-plugin-edfi-xsd';
import type { ReferenceUsageInfo } from './ReferenceUsageInfo';

export type MergedInterchangeEdfiInterchangeBrief = {
  interchangeBriefEntities: Array<InterchangeItem>,
  interchangeBriefExtendedReferences: Array<ReferenceUsageInfo>,
  interchangeBriefDescriptorReferences: Array<ReferenceUsageInfo>,
  interchangeBriefMarkdownEscapedDocumentation: string,
};

const enhancerName: string = 'MergedInterchangeSetupEnhancer';

export function addMergedInterchangeEdfiInterchangeBriefTo(mergedInterchange: MergedInterchange) {
  if (mergedInterchange.data.edfiInterchangeBrief == null) mergedInterchange.data.edfiInterchangeBrief = {};

  Object.assign(mergedInterchange.data.edfiInterchangeBrief, {
    interchangeBriefEntities: [],
    interchangeBriefExtendedReferences: [],
    interchangeBriefDescriptorReferences: [],
    interchangeBriefMarkdownEscapedDocumentation: '',
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const xsdRepository: ?EdFiXsdEntityRepository = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (xsdRepository == null) return;
    xsdRepository.mergedInterchange.forEach(mergedInterchange => {
      addMergedInterchangeEdfiInterchangeBriefTo(mergedInterchange);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
