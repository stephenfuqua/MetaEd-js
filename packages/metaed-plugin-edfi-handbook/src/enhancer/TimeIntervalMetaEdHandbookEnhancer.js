// @flow
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { ColumnDataTypes } from 'metaed-plugin-edfi-ods';
import { createTimeIntervalSimpleType } from 'metaed-plugin-edfi-xsd';
import { createDefaultHandbookEntry } from './BaseSimpleTypeMetaEdHandbookEnhancer';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName: string = 'TimeIntervalMetaEdHandbookEnhancer';
const timeIntervalName: string = 'TimeInterval';
const timeIntervalDocumentation: string = 'A period of time with fixed, well-defined limits.';
const timeIntervalEdfiId: string = '110';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const handbookRepository: ?EdfiHandbookRepository = edfiHandbookRepositoryForNamespace(metaEd, coreNamespace);
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
