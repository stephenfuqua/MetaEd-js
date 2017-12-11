// @flow
import type { MetaEdEnvironment, EnhancerResult, InterchangeItem } from 'metaed-core';
import type { EdFiXsdEntityRepository, MergedInterchange } from 'metaed-plugin-edfi-xsd';
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
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  Array.from(edFiXsdEntityRepository.mergedInterchange.values()).forEach(mergedInterchange => {
    addMergedInterchangeEdfiInterchangeBriefTo(mergedInterchange);
  });

  return {
    enhancerName,
    success: true,
  };
}
