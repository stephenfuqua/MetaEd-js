// @flow
import type { EnhancerResult, MetaEdEnvironment, PluginEnvironment } from 'metaed-core';
import { ColumnDataTypes } from 'metaed-plugin-edfi-ods';
import { createDefaultHandbookEntry } from './XsdBuiltinTypeMetaEdHandbookEnhancerBase';
import type { HandbookEntry } from '../model/HandbookEntry';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';

const enhancerName: string = 'TimeMetaEdHandbookEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const results: Array<HandbookEntry> = metaEd.propertyIndex.time.map(property =>
    createDefaultHandbookEntry(property, 'Time Type', ColumnDataTypes.time),
  );
  (((metaEd.plugin.get('edfiHandbook'): any): PluginEnvironment).entity: EdfiHandbookRepository).handbookEntries.push(
    ...results,
  );

  return {
    enhancerName,
    success: true,
  };
}
