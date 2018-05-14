// @flow
import {
  newMetaEdEnvironment,
  newDecimalProperty,
  newSharedDecimalProperty,
  newDecimalType,
  newSharedDecimal,
  newNamespace,
  NoSharedSimple,
} from 'metaed-core';

import type {
  DecimalProperty,
  DecimalType,
  MetaEdEnvironment,
  SharedDecimal,
  SharedDecimalProperty,
  Namespace,
} from 'metaed-core';

import { enhance } from '../../../src/enhancer/property/DecimalReferenceEnhancer';

describe('when enhancing decimal property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: DecimalProperty;
  let referencedEntity: DecimalType;

  beforeAll(() => {
    property = Object.assign(newDecimalProperty(), {
      metaEdName: referencedEntityName,
      namespace,
      parentEntityName,
    });
    metaEd.propertyIndex.decimal.push(property);

    referencedEntity = Object.assign(newDecimalType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.decimalType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', () => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });

  it('should have decimal type with no referring properties', () => {
    expect(referencedEntity.referringSimpleProperties).toEqual([]);
  });
});

describe('when enhancing shared decimal property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: SharedDecimalProperty;
  let referencedEntity: SharedDecimal;
  let decimalType: DecimalType;

  beforeAll(() => {
    property = Object.assign(newSharedDecimalProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
      namespace,
      referencedType: referencedEntityName,
    });
    metaEd.propertyIndex.sharedDecimal.push(property);

    referencedEntity = Object.assign(newSharedDecimal(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.sharedDecimal.set(referencedEntity.metaEdName, referencedEntity);

    decimalType = Object.assign(newDecimalType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.decimalType.set(referencedEntity.metaEdName, decimalType);

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
  });

  it('should have decimal type with correct referring properties', () => {
    expect(decimalType.referringSimpleProperties).toContain(property);
  });
});

describe('when enhancing decimal property across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: DecimalProperty;
  let referencedEntity: DecimalType;

  beforeAll(() => {
    property = Object.assign(newDecimalProperty(), {
      metaEdName: referencedEntityName,
      namespace: extensionNamespace,
      parentEntityName,
    });
    metaEd.propertyIndex.decimal.push(property);

    referencedEntity = Object.assign(newDecimalType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.decimalType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', () => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });

  it('should have decimal type with no referring properties', () => {
    expect(referencedEntity.referringSimpleProperties).toEqual([]);
  });
});

describe('when enhancing shared decimal property across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';
  let property: SharedDecimalProperty;
  let referencedEntity: SharedDecimal;
  let decimalType: DecimalType;

  beforeAll(() => {
    property = Object.assign(newSharedDecimalProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
      namespace: extensionNamespace,
      referencedType: referencedEntityName,
    });
    metaEd.propertyIndex.sharedDecimal.push(property);

    referencedEntity = Object.assign(newSharedDecimal(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.sharedDecimal.set(referencedEntity.metaEdName, referencedEntity);

    decimalType = Object.assign(newDecimalType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.decimalType.set(referencedEntity.metaEdName, decimalType);

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
  });

  it('should have decimal type with correct referring properties', () => {
    expect(decimalType.referringSimpleProperties).toContain(property);
  });
});
