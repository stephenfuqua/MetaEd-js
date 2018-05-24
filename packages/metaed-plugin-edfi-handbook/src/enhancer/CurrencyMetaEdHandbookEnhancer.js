// @flow
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { ColumnDataTypes } from 'metaed-plugin-edfi-ods';
import { createCurrencySimpleType } from 'metaed-plugin-edfi-xsd';
import { createDefaultHandbookEntry } from './BaseSimpleTypeMetaEdHandbookEnhancer';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName: string = 'CurrencyMetaEdHandbookEnhancer';
const currencyName: string = 'Currency';
const currencyDocumentation: string = 'U.S. currency in dollars and cents.';
const currencyEdfiId: string = '36';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const handbookRepository: ?EdfiHandbookRepository = edfiHandbookRepositoryForNamespace(metaEd, coreNamespace);
  if (handbookRepository == null) return { enhancerName, success: false };

  handbookRepository.handbookEntries.push(
    createDefaultHandbookEntry(
      createCurrencySimpleType(),
      currencyEdfiId,
      currencyName,
      currencyDocumentation,
      ColumnDataTypes.currency,
    ),
  );

  return {
    enhancerName,
    success: true,
  };
}
