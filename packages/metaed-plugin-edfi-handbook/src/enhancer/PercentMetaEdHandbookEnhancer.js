// @flow
import type { EnhancerResult, MetaEdEnvironment, Namespace } from 'metaed-core';
import { ColumnDataTypes } from 'metaed-plugin-edfi-ods';
import { createPercentSimpleType } from 'metaed-plugin-edfi-xsd';
import { createDefaultHandbookEntry } from './BaseSimpleTypeMetaEdHandbookEnhancer';
import type { EdfiHandbookRepository } from '../model/EdfiHandbookRepository';
import { edfiHandbookRepositoryForNamespace } from './EnhancerHelper';

const enhancerName: string = 'PercentMetaEdHandbookEnhancer';
const percentName: string = 'Percent';
const percentyDocumentation: string = 'A proportion in relation to the whole (as measured in parts per one hundred).';
const percentEdfiId: string = '80';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const handbookRepository: ?EdfiHandbookRepository = edfiHandbookRepositoryForNamespace(metaEd, coreNamespace);
  if (handbookRepository == null) return { enhancerName, success: false };

  handbookRepository.handbookEntries.push(
    createDefaultHandbookEntry(
      createPercentSimpleType(),
      percentEdfiId,
      percentName,
      percentyDocumentation,
      ColumnDataTypes.percent,
    ),
  );

  return {
    enhancerName,
    success: true,
  };
}
