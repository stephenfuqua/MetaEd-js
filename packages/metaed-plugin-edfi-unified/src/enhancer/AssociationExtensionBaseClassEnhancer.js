// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName: string = 'AssociationExtensionBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'associationExtension').forEach(childEntity => {
    const baseEntity: ?ModelBase = getEntityForNamespaces(
      childEntity.baseEntityName,
      [childEntity.namespace, ...childEntity.namespace.dependencies],
      'association',
      'associationSubclass',
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
