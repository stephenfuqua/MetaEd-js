// @flow
import {
  newMetaEdEnvironment,
  newDomainEntity,
  newDomainEntitySubclass,
  newDomainEntityExtension,
  newNamespace,
} from 'metaed-core';
import type { MetaEdEnvironment, DomainEntity, DomainEntitySubclass, DomainEntityExtension } from 'metaed-core';
import { enhance } from '../../src/enhancer/DomainEntityExtensionBaseClassEnhancer';

describe('when enhancing domainEntity extension referring to domainEntity', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: DomainEntity;
  let childEntity: DomainEntityExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntityExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntityExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});

describe('when enhancing domainEntity extension referring to domainEntity subclass', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: DomainEntitySubclass;
  let childEntity: DomainEntityExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntitySubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntityExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntityExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});

describe('when enhancing domainEntity extension referring to domainEntity across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: DomainEntity;
  let childEntity: DomainEntityExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntityExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
      namespace: extensionNamespace,
    });
    extensionNamespace.entity.domainEntityExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});

describe('when enhancing domainEntity extension referring to domainEntity subclass across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName: string = 'ParentEntityName';
  let parentEntity: DomainEntitySubclass;
  let childEntity: DomainEntityExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newDomainEntitySubclass(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.domainEntitySubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newDomainEntityExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
      namespace: extensionNamespace,
    });
    extensionNamespace.entity.domainEntityExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
  });
});
