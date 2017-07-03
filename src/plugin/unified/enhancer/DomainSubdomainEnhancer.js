// @flow
import type { MetaEdEnvironment } from '../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../core/enhancer/EnhancerResult';
import { getAll, getEntity } from '../../../core/model/EntityRepository';
import { asSubdomain } from '../../../core/model/Subdomain';
import { asDomain } from '../../../core/model/Domain';

const enhancerName: string = 'DomainSubdomainEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAll(metaEd.entity, 'subdomain').forEach(subdomain => {
    const parentDomain = getEntity(metaEd.entity, asSubdomain(subdomain).parentMetaEdName, 'domain');
    if (parentDomain) asDomain(parentDomain).subdomains.push(asSubdomain(subdomain));
  });

  getAll(metaEd.entity, 'domain').forEach(domain => {
    asDomain(domain).subdomains.sort((a, b) => a.position - b.position);
  });

  return {
    enhancerName,
    success: true,
  };
}
