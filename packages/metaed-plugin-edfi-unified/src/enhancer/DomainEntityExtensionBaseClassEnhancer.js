// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName: string = 'DomainEntityExtensionBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'domainEntityExtension').forEach(childEntity => {
    const baseEntity: ?ModelBase = getEntityForNamespaces(
      childEntity.baseEntityName,
      [childEntity.namespace, ...childEntity.namespace.dependencies],
      'domainEntity',
      'domainEntitySubclass',
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
