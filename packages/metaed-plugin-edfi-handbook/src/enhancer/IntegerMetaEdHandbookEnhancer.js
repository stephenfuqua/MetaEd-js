// @flow
import type { EnhancerResult, MetaEdEnvironment, IntegerType, Namespace } from 'metaed-core';
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { createDefaultHandbookEntry } from './SimpleTypeMetaEdHandbookEnhancerBase';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName: string = 'IntegerMetaEdHandbookEnhancer';

function getTypeCharacteristicsFor(entity: IntegerType): Array<string> {
  const results = [];
  if (entity.minValue) results.push(`min value: ${entity.minValue}`);
  if (entity.maxValue) results.push(`max value: ${entity.maxValue}`);

  return results;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const handbookRepository: ?EdfiHandbookRepository = edfiHandbookRepositoryForNamespace(metaEd, namespace);
    if (handbookRepository == null) return;
    ((getEntitiesOfTypeForNamespaces([namespace], 'integerType'): any): Array<IntegerType>).forEach(entity => {
      handbookRepository.handbookEntries.push(
        Object.assign(createDefaultHandbookEntry(entity, '', metaEd), {
          entityType: entity.isShort ? 'ShortType' : 'IntegerType',
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
