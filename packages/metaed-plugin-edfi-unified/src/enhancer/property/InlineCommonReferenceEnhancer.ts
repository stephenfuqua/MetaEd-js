import { MetaEdEnvironment, EnhancerResult, Namespace, Common } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

const enhancerName = 'InlineCommonReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.inlineCommon.forEach(property => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: Common | null = getEntityForNamespaces(
      property.metaEdName,
      namespaces,
      'common',
    ) as Common | null;
    if (referencedEntity && referencedEntity.inlineInOds) property.referencedEntity = referencedEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
