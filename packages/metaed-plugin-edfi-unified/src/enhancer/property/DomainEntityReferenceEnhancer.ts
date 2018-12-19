import { MetaEdEnvironment, EnhancerResult, Namespace, TopLevelEntity } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

const enhancerName = 'DomainEntityReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.domainEntity.forEach(property => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: TopLevelEntity | null = getEntityForNamespaces(
      property.metaEdName,
      namespaces,
      'domainEntity',
      'domainEntitySubclass',
    ) as TopLevelEntity | null;

    if (referencedEntity) {
      property.referencedEntity = referencedEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
