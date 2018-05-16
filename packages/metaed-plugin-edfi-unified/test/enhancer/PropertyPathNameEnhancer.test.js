// @flow
import R from 'ramda';
import {
  newMetaEdEnvironment,
  newDomainEntity,
  newDomainEntityProperty,
  addEntityForNamespace,
  addProperty,
  newNamespace,
} from 'metaed-core';
import type { MetaEdEnvironment } from 'metaed-core';
import { enhance } from '../../src/enhancer/PropertyPathNameEnhancer';

describe('when enhancing entity property without with context', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  const propertyName: string = 'PropertyName';

  beforeAll(() => {
    const property = Object.assign(newDomainEntityProperty(), {
      metaEdName: propertyName,
      parentEntityName,
      namespace,
    });

    const parentEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
      properties: [property],
      namespace,
    });

    addEntityForNamespace(parentEntity);
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have correct property path', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === propertyName));
    expect(property.propertyPathName).toBe(propertyName);
  });
});

describe('when enhancing entity property with a with context', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  const propertyName: string = 'PropertyName';
  const withContext: string = 'WithContext';

  beforeAll(() => {
    const property = Object.assign(newDomainEntityProperty(), {
      metaEdName: propertyName,
      parentEntityName,
      namespace,
      withContext,
    });

    const parentEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
      properties: [property],
      namespace,
    });

    addEntityForNamespace(parentEntity);
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have correct property path', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === propertyName));
    expect(property.propertyPathName).toBe(withContext + propertyName);
  });
});

describe('when enhancing entity property with identical with context', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  const propertyName: string = 'PropertyName';
  const withContext: string = propertyName;

  beforeAll(() => {
    const property = Object.assign(newDomainEntityProperty(), {
      metaEdName: propertyName,
      parentEntityName,
      withContext,
      namespace,
    });

    const parentEntity = Object.assign(newDomainEntity(), {
      metaEdName: parentEntityName,
      properties: [property],
      namespace,
    });

    addEntityForNamespace(parentEntity);
    addProperty(metaEd.propertyIndex, property);

    enhance(metaEd);
  });

  it('should have correct property path', () => {
    const property = R.head(metaEd.propertyIndex.domainEntity.filter(p => p.metaEdName === propertyName));
    expect(property.propertyPathName).toBe(withContext);
  });
});
