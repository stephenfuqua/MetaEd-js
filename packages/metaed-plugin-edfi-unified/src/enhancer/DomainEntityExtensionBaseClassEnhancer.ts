import { MetaEdEnvironment, EnhancerResult, DomainEntityExtension, TopLevelEntity } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName = 'DomainEntityExtensionBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'domainEntityExtension') as Array<DomainEntityExtension>).forEach(childEntity => {
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
