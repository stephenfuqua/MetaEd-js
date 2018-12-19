import { MetaEdEnvironment, EnhancerResult, Subdomain, Domain } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName = 'SubdomainParentEntityEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'subdomain') as Array<Subdomain>).forEach(childEntity => {
    const parent: Domain | null = getEntityForNamespaces(
      childEntity.parentMetaEdName,
      [childEntity.namespace, ...childEntity.namespace.dependencies],
      'domain',
    ) as Domain | null;
    if (parent) childEntity.parent = parent;
  });

  return {
    enhancerName,
    success: true,
  };
}
