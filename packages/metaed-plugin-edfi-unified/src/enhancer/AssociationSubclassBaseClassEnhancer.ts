import { MetaEdEnvironment, EnhancerResult, AssociationExtension, TopLevelEntity } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName = 'AssociationSubclassBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'associationSubclass') as Array<AssociationExtension>).forEach(childEntity => {
    const baseEntity: TopLevelEntity | null = getEntityForNamespaces(
      childEntity.baseEntityName,
      [childEntity.namespace, ...childEntity.namespace.dependencies],
      'association',
      'associationSubclass',
    ) as TopLevelEntity | null;

    if (baseEntity) {
      childEntity.baseEntity = baseEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
