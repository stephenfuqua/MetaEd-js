// @flow
import type { MetaEdEnvironment, EnhancerResult, Subdomain, Domain } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName: string = 'SubdomainParentEntityEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'subdomain'): any): Array<Subdomain>).forEach(childEntity => {
    const parent: ?Domain = ((getEntityForNamespaces(
      childEntity.parentMetaEdName,
      [childEntity.namespace, ...childEntity.namespace.dependencies],
      'domain',
    ): any): ?Domain);
    if (parent) childEntity.parent = parent;
  });

  return {
    enhancerName,
    success: true,
  };
}
