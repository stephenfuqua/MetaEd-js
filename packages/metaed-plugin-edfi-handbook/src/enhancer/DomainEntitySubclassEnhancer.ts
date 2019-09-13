import { EnhancerResult, MetaEdEnvironment, DomainEntitySubclass, Namespace } from 'metaed-core';
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { createDefaultHandbookEntry } from './TopLevelEntityHandbookEntryCreator';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';
import { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';

const enhancerName = 'DomainEntitySubclassMetaEdHandbookEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const handbookRepository: EdfiHandbookRepository | null = edfiHandbookRepositoryForNamespace(metaEd, namespace);
    if (handbookRepository == null) return;
    (getEntitiesOfTypeForNamespaces([namespace], 'domainEntitySubclass') as DomainEntitySubclass[]).forEach(entity => {
      handbookRepository.handbookEntries.push({
        ...createDefaultHandbookEntry(entity, '', metaEd),
        entityType: `${entity.metaEdName} extending ${entity.baseEntityName}`,
      });
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
