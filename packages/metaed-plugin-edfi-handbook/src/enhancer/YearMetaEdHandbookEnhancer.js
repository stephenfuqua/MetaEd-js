// @flow
import type { EnhancerResult, MetaEdEnvironment, PluginEnvironment } from 'metaed-core';
import { ColumnDataTypes } from 'metaed-plugin-edfi-ods';
import { createDefaultHandbookEntry } from './XsdBuiltinTypeMetaEdHandbookEnhancerBase';
import type { HandbookEntry } from '../model/HandbookEntry';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';

const enhancerName: string = 'YearMetaEdHandbookEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const results: Array<HandbookEntry> = metaEd.propertyIndex.year.map(property =>
    createDefaultHandbookEntry(property, 'Year Type', ColumnDataTypes.year),
  );
  (((metaEd.plugin.get('edfiHandbook'): any): PluginEnvironment).entity: EdfiHandbookRepository).handbookEntries.push(
    ...results,
  );

  return {
    enhancerName,
    success: true,
  };
}
