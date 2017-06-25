// @flow
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../packages/metaed-core/src/enhancer/EnhancerResult';
import { getAll, getEntity } from '../../../../packages/metaed-core/src/model/EntityRepository';
import { asSubdomain } from '../../../../packages/metaed-core/src/model/Subdomain';
import { asDomain } from '../../../../packages/metaed-core/src/model/Domain';

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
