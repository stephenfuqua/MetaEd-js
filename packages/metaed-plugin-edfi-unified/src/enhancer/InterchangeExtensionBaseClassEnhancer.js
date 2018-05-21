// @flow
import type { MetaEdEnvironment, EnhancerResult, Interchange, InterchangeExtension } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName: string = 'InterchangeExtensionBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'interchangeExtension'): any): Array<InterchangeExtension>).forEach(childEntity => {
    const baseEntity: ?Interchange = ((getEntityForNamespaces(
      childEntity.baseEntityName,
      [childEntity.namespace, ...childEntity.namespace.dependencies],
      'interchange',
    ): any): ?Interchange);

    if (baseEntity) childEntity.baseEntity = baseEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
