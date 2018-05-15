// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName: string = 'SubdomainParentEntityEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'subdomain').forEach(childEntity => {
    const parent: ?ModelBase = getEntityForNamespaces(
      childEntity.parentMetaEdName,
      [childEntity.namespace, ...childEntity.namespace.dependencies],
      'domain',
    );
    if (parent) childEntity.parent = parent;
  });

  return {
    enhancerName,
    success: true,
  };
}
