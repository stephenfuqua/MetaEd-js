// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import type { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';

const enhancerName: string = 'MergedInterchangeAdditionalPropertiesEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  Array.from(edFiXsdEntityRepository.mergedInterchange.values()).forEach(mergedInterchange => {
    mergedInterchange.interchangeName = `Interchange${mergedInterchange.metaEdName}`;
    mergedInterchange.schemaLocation = mergedInterchange.namespace.isExtension
      ? `${mergedInterchange.namespace.projectExtension}-Ed-Fi-Extended-Core.xsd`
      : 'Ed-Fi-Core.xsd';
  });

  return {
    enhancerName,
    success: true,
  };
}
