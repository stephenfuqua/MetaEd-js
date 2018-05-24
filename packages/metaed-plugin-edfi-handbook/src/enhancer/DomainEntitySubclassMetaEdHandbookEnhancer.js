// @flow
import type { EnhancerResult, MetaEdEnvironment, DomainEntitySubclass, Namespace } from 'metaed-core';
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { createDefaultHandbookEntry } from './TopLevelEntityMetaEdHandbookEnhancerBase';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';

const enhancerName: string = 'DomainEntitySubclassMetaEdHandbookEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const handbookRepository: ?EdfiHandbookRepository = edfiHandbookRepositoryForNamespace(metaEd, namespace);
    if (handbookRepository == null) return;
    ((getEntitiesOfTypeForNamespaces([namespace], 'domainEntitySubclass'): any): Array<DomainEntitySubclass>).forEach(
      entity => {
        handbookRepository.handbookEntries.push(
          Object.assign(createDefaultHandbookEntry(entity, '', metaEd), {
            entityType: `${entity.metaEdName} extending ${entity.baseEntityName}`,
          }),
        );
      },
    );
  });

  return {
    enhancerName,
    success: true,
  };
}
