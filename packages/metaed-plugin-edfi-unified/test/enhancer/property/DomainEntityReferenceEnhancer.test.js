// @flow
import R from 'ramda';
import {
  newMetaEdEnvironment,
  newNamespace,
  newDomainEntityProperty,
  newDomainEntity,
  newDomainEntitySubclass,
} from 'metaed-core';
import type { MetaEdEnvironment, DomainEntityProperty, DomainEntity, DomainEntitySubclass, Namespace } from 'metaed-core';
import { enhance } from '../../../src/enhancer/property/DomainEntityReferenceEnhancer';

describe('when enhancing domainEntity property referring to domainEntity', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: referencedEntityName,
      namespace,
      parentEntityName,
    });
    metaEd.propertyIndex.domainEntity.push(property);

    const parentEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
      namespace,
      properties: [property],
    });
    namespace.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.domainEntity.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});

describe('when enhancing domainEntity property referring to subclass', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: referencedEntityName,
      namespace,
      parentEntityName,
    });
    metaEd.propertyIndex.domainEntity.push(property);

    const parentEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
      namespace,
      properties: [property],
    });
    namespace.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: DomainEntitySubclass = Object.assign(newDomainEntitySubclass(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.domainEntitySubclass.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});

describe('when enhancing domainEntity property referring to domainEntity across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: DomainEntityProperty = Object.assign(newDomainEntityProperty(), {
      metaEdName: referencedEntityName,
      namespace: extensionNamespace,
      parentEntityName,
    });
    metaEd.propertyIndex.domainEntity.push(property);

    const parentEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
      namespace: extensionNamespace,
      properties: [property],
    });
    extensionNamespace.entity.domainEntity.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: DomainEntity = Object.assign(newDomainEntity(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.domainEntity.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});
