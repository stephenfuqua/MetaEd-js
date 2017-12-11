// @flow
import type { MetaEdEnvironment } from 'metaed-core';
import type { EdFiXsdEntityRepository } from 'metaed-plugin-edfi-xsd';
import { escapeForMarkdownNewLine } from './Shared';
import type { MergedInterchangeEdfiInterchangeBrief } from '../model/MergedInterchange';

const enhancerName = 'MergedInterchangeDocumentationEnhancer';

export function enhance(metaEd: MetaEdEnvironment) {
  const xsdRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  xsdRepository.mergedInterchange.forEach(mergedInterchange => {
    ((mergedInterchange.data.edfiInterchangeBrief: any): MergedInterchangeEdfiInterchangeBrief).interchangeBriefMarkdownEscapedDocumentation =
      escapeForMarkdownNewLine(mergedInterchange.documentation);
  });

  return {
    enhancerName,
    success: true,
  };
}
