import { newMetaEdEnvironment, newDomain, newSubdomain, addEntityForNamespace, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Domain, Subdomain, Namespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/SubdomainParentEntityEnhancer';

describe('when enhancing subdomain with parent', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const childEntityName = 'ChildEntityName';
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
