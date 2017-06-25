// @flow
import { metaEdEnvironmentFactory } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { Domain } from '../../../../packages/metaed-core/src/model/Domain';
import { domainFactory } from '../../../../packages/metaed-core/src/model/Domain';
import type { Subdomain } from '../../../../packages/metaed-core/src/model/Subdomain';
import { subdomainFactory } from '../../../../packages/metaed-core/src/model/Subdomain';
import { addEntity } from '../../../../packages/metaed-core/src/model/EntityRepository';
import { enhance } from '../../src/enhancer/SubdomainParentEntityEnhancer';

describe('when enhancing subdomain with parent', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const parentEntityName: string = 'ParentEntityName';
  const childEntityName: string = 'ChildEntityName';
  let parentEntity: Domain;
  let childEntity: Subdomain;

  beforeAll(() => {
    parentEntity = Object.assign(domainFactory(), {
      metaEdName: parentEntityName,
    });
    addEntity(metaEd.entity, parentEntity);

    childEntity = Object.assign(subdomainFactory(), {
      metaEdName: childEntityName,
      parentMetaEdName: parentEntityName,
    });
    addEntity(metaEd.entity, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.parent).toBe(parentEntity);
  });
});
