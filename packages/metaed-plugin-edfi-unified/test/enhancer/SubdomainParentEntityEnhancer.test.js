// @flow
import { newMetaEdEnvironment, newDomain, newSubdomain, addEntityForNamespace, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, Domain, Subdomain } from 'metaed-core';
import { enhance } from '../../src/enhancer/SubdomainParentEntityEnhancer';

describe('when enhancing subdomain with parent', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  const childEntityName: string = 'ChildEntityName';
  let parentEntity: Domain;
  let childEntity: Subdomain;

  beforeAll(() => {
    parentEntity = Object.assign(newDomain(), {
      metaEdName: parentEntityName,
      namespace,
    });
    addEntityForNamespace(parentEntity);

    childEntity = Object.assign(newSubdomain(), {
      metaEdName: childEntityName,
      parentMetaEdName: parentEntityName,
      namespace,
    });
    addEntityForNamespace(childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.parent).toBe(parentEntity);
  });
});
