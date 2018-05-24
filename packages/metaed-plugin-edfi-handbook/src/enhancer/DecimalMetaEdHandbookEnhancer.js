// @flow
import type { EnhancerResult, MetaEdEnvironment, DecimalType, Namespace } from 'metaed-core';
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { createDefaultHandbookEntry } from './SimpleTypeMetaEdHandbookEnhancerBase';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName: string = 'DecimalMetaEdHandbookEnhancer';

function getTypeCharacteristicsFor(entity: DecimalType): Array<string> {
  const results: Array<string> = [];
  if (entity.totalDigits) results.push(`total digits: ${entity.totalDigits}`);
  if (entity.decimalPlaces) results.push(`decimal places: ${entity.decimalPlaces}`);

  if (entity.minValue) results.push(`min value: ${entity.minValue}`);
  if (entity.maxValue) results.push(`max value: ${entity.maxValue}`);

  return results;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.namespace.forEach((namespace: Namespace) => {
    const handbookRepository: ?EdfiHandbookRepository = edfiHandbookRepositoryForNamespace(metaEd, namespace);
    if (handbookRepository == null) return;
    ((getEntitiesOfTypeForNamespaces([namespace], 'decimalType'): any): Array<DecimalType>).forEach(entity => {
      handbookRepository.handbookEntries.push(
        Object.assign(createDefaultHandbookEntry(entity, 'Decimal Type', metaEd), {
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
