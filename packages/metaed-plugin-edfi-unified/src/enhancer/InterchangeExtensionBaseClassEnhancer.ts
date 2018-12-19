import { MetaEdEnvironment, EnhancerResult, Interchange, InterchangeExtension } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName = 'InterchangeExtensionBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'interchangeExtension') as Array<InterchangeExtension>).forEach(childEntity => {
    const baseEntity: Interchange | null = getEntityForNamespaces(
      childEntity.baseEntityName,
      [childEntity.namespace, ...childEntity.namespace.dependencies],
      'interchange',
    ) as Interchange | null;

    if (baseEntity) childEntity.baseEntity = baseEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
