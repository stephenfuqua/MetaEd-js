// @flow
import type { EnhancerResult, MetaEdEnvironment, Enumeration, Namespace } from 'metaed-core';
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { createDefaultHandbookEntry } from './TopLevelEntityMetaEdHandbookEnhancerBase';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName: string = 'EnumerationMetaEdHandbookEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const handbookRepository: ?EdfiHandbookRepository = edfiHandbookRepositoryForNamespace(metaEd, namespace);
    if (handbookRepository == null) return;

    ((getEntitiesOfTypeForNamespaces([namespace], 'enumeration'): any): Array<Enumeration>).forEach(entity => {
      handbookRepository.handbookEntries.push(createDefaultHandbookEntry(entity, 'Enumeration', metaEd));
    });

    ((getEntitiesOfTypeForNamespaces([namespace], 'mapTypeEnumeration'): any): Array<Enumeration>).forEach(entity => {
      handbookRepository.handbookEntries.push(createDefaultHandbookEntry(entity, 'Enumeration', metaEd));
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
