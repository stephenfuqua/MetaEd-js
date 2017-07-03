// @flow
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import { subdomainFactory } from '../../../../src/core/model/Subdomain';
import { domainFactory } from '../../../../src/core/model/Domain';
import { addEntity, getEntity } from '../../../../src/core/model/EntityRepository';
import { enhance } from '../../../../src/plugin/unified/enhancer/DomainSubdomainEnhancer';

describe('when enhancing domain', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const domainMetaEdName: string = 'DomainMetaEdName';
  const subdomain1MetaEdName: string = 'Subdomain1MetaEdName';
  const subdomain2MetaEdName: string = 'Subdomain2MetaEdName';
  const subdomain3MetaEdName: string = 'Subdomain3MetaEdName';

  const subdomain1 = Object.assign(subdomainFactory(), {
    metaEdName: subdomain1MetaEdName,
    parentMetaEdName: domainMetaEdName,
    position: 1,
  });

  const subdomain2 = Object.assign(subdomainFactory(), {
    metaEdName: subdomain2MetaEdName,
    parentMetaEdName: domainMetaEdName,
    position: 2,
  });

  const subdomain3 = Object.assign(subdomainFactory(), {
    metaEdName: subdomain3MetaEdName,
    parentMetaEdName: domainMetaEdName,
    position: 3,
  });

  beforeAll(() => {
    addEntity(metaEd.entity, Object.assign(domainFactory(), { metaEdName: domainMetaEdName }));
    addEntity(metaEd.entity, subdomain2);
    addEntity(metaEd.entity, subdomain1);
    addEntity(metaEd.entity, subdomain3);

    enhance(metaEd);
  });

  it('should have sorted subdomain references', () => {
    const domain: any = getEntity(metaEd.entity, domainMetaEdName, 'domain');
    expect(domain.subdomains).toHaveLength(3);
    expect(domain.subdomains[0]).toBe(subdomain1);
    expect(domain.subdomains[1]).toBe(subdomain2);
    expect(domain.subdomains[2]).toBe(subdomain3);
  });
});
