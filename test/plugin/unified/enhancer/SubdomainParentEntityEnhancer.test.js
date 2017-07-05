// @flow
import { metaEdEnvironmentFactory } from '../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../src/core/MetaEdEnvironment';
import type { Domain } from '../../../../src/core/model/Domain';
import { domainFactory } from '../../../../src/core/model/Domain';
import type { Subdomain } from '../../../../src/core/model/Subdomain';
import { subdomainFactory } from '../../../../src/core/model/Subdomain';
import { addEntity } from '../../../../src/core/model/EntityRepository';
import { enhance } from '../../../../src/plugin/unified/enhancer/SubdomainParentEntityEnhancer';

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
