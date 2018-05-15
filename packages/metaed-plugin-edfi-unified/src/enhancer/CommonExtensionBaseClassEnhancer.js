// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName: string = 'CommonExtensionBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'commonExtension').forEach(childEntity => {
    const baseEntity: ?ModelBase = getEntityForNamespaces(
      childEntity.baseEntityName,
      [childEntity.namespace, ...childEntity.namespace.dependencies],
      'common',
    );

    if (baseEntity) {
      childEntity.baseEntity = baseEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
