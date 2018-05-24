// @flow
import type { EnhancerResult, MetaEdEnvironment, StringType, Namespace } from 'metaed-core';
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { createDefaultHandbookEntry } from './SimpleTypeMetaEdHandbookEnhancerBase';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName: string = 'StringMetaEdHandbookEnhancer';

function getTypeCharacteristicsFor(entity: StringType): Array<string> {
  const results: Array<string> = [];
  if (entity.minLength) results.push(`min length: ${entity.minLength}`);
  if (entity.maxLength) results.push(`max length: ${entity.maxLength}`);
  return results;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const handbookRepository: ?EdfiHandbookRepository = edfiHandbookRepositoryForNamespace(metaEd, namespace);
    if (handbookRepository == null) return;
    ((getEntitiesOfTypeForNamespaces([namespace], 'stringType'): any): Array<StringType>).forEach(entity => {
      handbookRepository.handbookEntries.push(
        Object.assign(createDefaultHandbookEntry(entity, 'String Type', metaEd), {
          typeCharacteristics: getTypeCharacteristicsFor(entity),
        }),
      );
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
