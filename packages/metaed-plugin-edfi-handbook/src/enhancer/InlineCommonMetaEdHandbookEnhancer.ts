import { EnhancerResult, MetaEdEnvironment, Common, Namespace } from 'metaed-core';
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { createDefaultHandbookEntry } from './TopLevelEntityMetaEdHandbookEnhancerBase';
import { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName = 'InlineCommonMetaEdHandbookEnhancer';

function isInlineCommon(entity: Common): boolean {
  return entity.inlineInOds;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const handbookRepository: EdfiHandbookRepository | null = edfiHandbookRepositoryForNamespace(metaEd, namespace);
    if (handbookRepository == null) return;
    (getEntitiesOfTypeForNamespaces([namespace], 'common') as Common[]).filter(isInlineCommon).forEach(entity => {
      handbookRepository.handbookEntries.push(createDefaultHandbookEntry(entity, 'Inline Common', metaEd));
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
