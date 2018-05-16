// @flow
import {
  newMetaEdEnvironment,
  newSubdomain,
  newDomain,
  addEntityForNamespace,
  getEntityForNamespaces,
  newNamespace,
} from 'metaed-core';
import type { MetaEdEnvironment } from 'metaed-core';
import { enhance } from '../../src/enhancer/DomainSubdomainEnhancer';

describe('when enhancing domain', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const domainMetaEdName: string = 'DomainMetaEdName';
  const subdomain1MetaEdName: string = 'Subdomain1MetaEdName';
  const subdomain2MetaEdName: string = 'Subdomain2MetaEdName';
  const subdomain3MetaEdName: string = 'Subdomain3MetaEdName';

  const subdomain1 = Object.assign(newSubdomain(), {
    metaEdName: subdomain1MetaEdName,
    parentMetaEdName: domainMetaEdName,
    namespace,
    position: 1,
  });

  const subdomain2 = Object.assign(newSubdomain(), {
    metaEdName: subdomain2MetaEdName,
    parentMetaEdName: domainMetaEdName,
    namespace,
    position: 2,
  });

  const subdomain3 = Object.assign(newSubdomain(), {
    metaEdName: subdomain3MetaEdName,
    parentMetaEdName: domainMetaEdName,
    namespace,
    position: 3,
  });

  beforeAll(() => {
    addEntityForNamespace(Object.assign(newDomain(), { metaEdName: domainMetaEdName, namespace }));
    addEntityForNamespace(subdomain2);
    addEntityForNamespace(subdomain1);
    addEntityForNamespace(subdomain3);

    enhance(metaEd);
  });

  it('should have sorted subdomain references', () => {
    const domain: any = getEntityForNamespaces(domainMetaEdName, [namespace], 'domain');
    expect(domain.subdomains).toHaveLength(3);
    expect(domain.subdomains[0]).toBe(subdomain1);
    expect(domain.subdomains[1]).toBe(subdomain2);
    expect(domain.subdomains[2]).toBe(subdomain3);
  });
});
