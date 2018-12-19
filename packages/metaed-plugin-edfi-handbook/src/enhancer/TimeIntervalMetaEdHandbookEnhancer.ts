import { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { ColumnDataTypes } from 'metaed-plugin-edfi-ods';
import { createTimeIntervalSimpleType } from 'metaed-plugin-edfi-xsd';
import { createDefaultHandbookEntry } from './BaseSimpleTypeMetaEdHandbookEnhancer';
import { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName = 'TimeIntervalMetaEdHandbookEnhancer';
const timeIntervalName = 'TimeInterval';
const timeIntervalDocumentation = 'A period of time with fixed, well-defined limits.';
const timeIntervalEdfiId = '110';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const coreNamespace: Namespace | undefined = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const handbookRepository: EdfiHandbookRepository | null = edfiHandbookRepositoryForNamespace(metaEd, coreNamespace);
  if (handbookRepository == null) return { enhancerName, success: false };

  handbookRepository.handbookEntries.push(
    createDefaultHandbookEntry(
      createTimeIntervalSimpleType(),
      timeIntervalEdfiId,
      timeIntervalName,
      timeIntervalDocumentation,
      ColumnDataTypes.duration,
    ),
  );

  return {
    enhancerName,
    success: true,
  };
}
