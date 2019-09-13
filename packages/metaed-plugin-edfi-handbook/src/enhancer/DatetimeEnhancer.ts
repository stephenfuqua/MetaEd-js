import { EnhancerResult, MetaEdEnvironment } from 'metaed-core';
import { ColumnDataTypes } from 'metaed-plugin-edfi-ods-sqlserver';
import { createDefaultHandbookEntry } from './XsdBuiltinTypeHandbookEntryCreator';
import { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName = 'DatetimeMetaEdHandbookEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.datetime.forEach(property => {
    const handbookRepository: EdfiHandbookRepository | null = edfiHandbookRepositoryForNamespace(metaEd, property.namespace);
    if (handbookRepository == null) return;
    handbookRepository.handbookEntries.push(createDefaultHandbookEntry(property, 'Datetime Type', ColumnDataTypes.datetime));
  });

  return {
    enhancerName,
    success: true,
  };
}
