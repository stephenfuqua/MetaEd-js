// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../metaed-core/index';
import { getEntitiesOfType, getEntity } from '../../../metaed-core/index';
import { asSubdomain } from '../../../metaed-core/src/model/Subdomain';
import { asDomain } from '../../../metaed-core/src/model/Domain';

const enhancerName: string = 'DomainSubdomainEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity, 'subdomain').forEach(subdomain => {
    const parentDomain = getEntity(metaEd.entity, asSubdomain(subdomain).parentMetaEdName, 'domain');
    if (parentDomain) asDomain(parentDomain).subdomains.push(asSubdomain(subdomain));
  });

  getEntitiesOfType(metaEd.entity, 'domain').forEach(domain => {
    asDomain(domain).subdomains.sort((a, b) => a.position - b.position);
  });

  return {
    enhancerName,
    success: true,
  };
}
