import { MetaEdEnvironment, EnhancerResult, DomainEntitySubclass, TopLevelEntity } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName = 'DomainEntitySubclassBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'domainEntitySubclass') as Array<DomainEntitySubclass>).forEach(childEntity => {
    const baseEntity: TopLevelEntity | null = getEntityForNamespaces(
      childEntity.baseEntityName,
      [childEntity.namespace, ...childEntity.namespace.dependencies],
      'domainEntity',
      'domainEntitySubclass',
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
