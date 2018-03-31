// @flow
import type { EnhancerResult, MetaEdEnvironment, PluginEnvironment } from 'metaed-core';
import { ColumnDataTypes } from 'metaed-plugin-edfi-ods';
import { createDefaultHandbookEntry } from './XsdBuiltinTypeMetaEdHandbookEnhancerBase';
import type { HandbookEntry } from '../model/HandbookEntry';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';

const enhancerName: string = 'DateMetaEdHandbookEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const results: Array<HandbookEntry> = metaEd.propertyIndex.date.map(property =>
    createDefaultHandbookEntry(property, 'Date Type', ColumnDataTypes.date),
  );
  (((metaEd.plugin.get('edfiHandbook'): any): PluginEnvironment).entity: EdfiHandbookRepository).handbookEntries.push(
    ...results,
  );

  return {
    enhancerName,
    success: true,
  };
}
