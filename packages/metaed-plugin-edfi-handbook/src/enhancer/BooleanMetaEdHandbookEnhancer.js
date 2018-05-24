// @flow
import type { EnhancerResult, MetaEdEnvironment } from 'metaed-core';
import { ColumnDataTypes } from 'metaed-plugin-edfi-ods';
import { createDefaultHandbookEntry } from './XsdBuiltinTypeMetaEdHandbookEnhancerBase';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName: string = 'BooleanMetaEdHandbookEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.boolean.forEach(property => {
    const handbookRepository: ?EdfiHandbookRepository = edfiHandbookRepositoryForNamespace(metaEd, property.namespace);
    if (handbookRepository == null) return;
    handbookRepository.handbookEntries.push(createDefaultHandbookEntry(property, 'Boolean Type', ColumnDataTypes.boolean));
  });

  return {
    enhancerName,
    success: true,
  };
}
