import { newMetaEdEnvironment, newDomainEntity, newDomainEntitySubclass, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, DomainEntity, DomainEntitySubclass, Namespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/DomainEntitySubclassBaseClassEnhancer';

describe('when enhancing domainEntity subclass referring to domainEntity', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const childEntityName = 'ChildEntityName';
  let parentEntity: DomainEntity;
  let childEntity: DomainEntitySubclass;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: childEntityName,
      baseEntityName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntitySubclass.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});

describe('when enhancing domainEntity subclass referring to domainEntity subclass', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const childEntityName = 'ChildEntityName';
  let parentEntity: DomainEntitySubclass;
  let childEntity: DomainEntitySubclass;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntitySubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: childEntityName,
      baseEntityName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntitySubclass.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});

describe('when enhancing domainEntity subclass referring to domainEntity across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const childEntityName = 'ChildEntityName';
  let parentEntity: DomainEntity;
  let childEntity: DomainEntitySubclass;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: childEntityName,
      baseEntityName: parentEntityName,
      namespace: extensionNamespace,
    });
    extensionNamespace.entity.domainEntitySubclass.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});

describe('when enhancing domainEntity subclass referring to domainEntity subclass across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const childEntityName = 'ChildEntityName';
  let parentEntity: DomainEntitySubclass;
  let childEntity: DomainEntitySubclass;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntitySubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: childEntityName,
      baseEntityName: parentEntityName,
      namespace: extensionNamespace,
    });
    extensionNamespace.entity.domainEntitySubclass.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});
