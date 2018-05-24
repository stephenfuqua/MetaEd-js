// @flow
import type { MetaEdEnvironment, Namespace } from 'metaed-core';
import type { EdFiXsdEntityRepository } from 'metaed-plugin-edfi-xsd';
import { edfiXsdRepositoryForNamespace } from 'metaed-plugin-edfi-xsd';
import { escapeForMarkdownNewLine } from './Shared';
import type { MergedInterchangeEdfiInterchangeBrief } from '../model/MergedInterchange';

const enhancerName = 'MergedInterchangeDocumentationEnhancer';

export function enhance(metaEd: MetaEdEnvironment) {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const xsdRepository: ?EdFiXsdEntityRepository = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (xsdRepository == null) return;
    xsdRepository.mergedInterchange.forEach(mergedInterchange => {
      ((mergedInterchange.data
        .edfiInterchangeBrief: any): MergedInterchangeEdfiInterchangeBrief).interchangeBriefMarkdownEscapedDocumentation = escapeForMarkdownNewLine(
        mergedInterchange.documentation,
      );
    });
  });
  return {
    enhancerName,
    success: true,
  };
}
