// @flow
import type { EnhancerResult, MetaEdEnvironment, Common, Namespace } from 'metaed-core';
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { createDefaultHandbookEntry } from './TopLevelEntityMetaEdHandbookEnhancerBase';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName: string = 'CommonMetaEdHandbookEnhancer';

function notInlineCommon(entity: Common): boolean {
  return !entity.inlineInOds;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const handbookRepository: ?EdfiHandbookRepository = edfiHandbookRepositoryForNamespace(metaEd, namespace);
    if (handbookRepository == null) return;
    ((getEntitiesOfTypeForNamespaces([namespace], 'common'): any): Array<Common>).filter(notInlineCommon).forEach(entity => {
      handbookRepository.handbookEntries.push(createDefaultHandbookEntry(entity, 'Common', metaEd));
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
