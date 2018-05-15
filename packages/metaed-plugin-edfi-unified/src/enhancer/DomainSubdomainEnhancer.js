// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces, asSubdomain, asDomain } from 'metaed-core';

const enhancerName: string = 'DomainSubdomainEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'subdomain').forEach(subdomain => {
    const parentDomain = getEntityForNamespaces(asSubdomain(subdomain).parentMetaEdName, [subdomain.namespace], 'domain');
    if (parentDomain) asDomain(parentDomain).subdomains.push(asSubdomain(subdomain));
  });

  getAllEntitiesOfType(metaEd, 'domain').forEach(domain => {
    asDomain(domain).subdomains.sort((a, b) => a.position - b.position);
  });

  return {
    enhancerName,
    success: true,
  };
}
