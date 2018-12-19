import {
  newMetaEdEnvironment,
  newIntegerProperty,
  newSharedIntegerProperty,
  newIntegerType,
  newSharedInteger,
  newNamespace,
  NoSharedSimple,
} from 'metaed-core';

import {
  IntegerProperty,
  IntegerType,
  MetaEdEnvironment,
  SharedInteger,
  SharedIntegerProperty,
  Namespace,
} from 'metaed-core';

import { enhance } from '../../../src/enhancer/property/IntegerReferenceEnhancer';

describe('when enhancing integer property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: IntegerProperty;
  let referencedEntity: IntegerType;

  beforeAll(() => {
    property = Object.assign(newIntegerProperty(), {
      metaEdName: referencedEntityName,
      namespace,
      parentEntityName,
    });
    metaEd.propertyIndex.integer.push(property);

    referencedEntity = Object.assign(newIntegerType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.integerType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', () => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });

  it('should have integer type with no referring properties', () => {
    expect(referencedEntity.referringSimpleProperties).toEqual([]);
  });
});

describe('when enhancing shared integer property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedIntegerProperty;
  let referencedEntity: SharedInteger;
  let integerType: IntegerType;

  beforeAll(() => {
    property = Object.assign(newSharedIntegerProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
      namespace,
      referencedType: referencedEntityName,
    });
    metaEd.propertyIndex.sharedInteger.push(property);

    referencedEntity = Object.assign(newSharedInteger(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.sharedInteger.set(referencedEntity.metaEdName, referencedEntity);

    integerType = Object.assign(newIntegerType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.integerType.set(referencedEntity.metaEdName, integerType);

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
  });

  it('should have integer type with correct referring properties', () => {
    expect(integerType.referringSimpleProperties).toContain(property);
  });
});

describe('when enhancing integer property across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: IntegerProperty;
  let referencedEntity: IntegerType;

  beforeAll(() => {
    property = Object.assign(newIntegerProperty(), {
      metaEdName: referencedEntityName,
      namespace: extensionNamespace,
      parentEntityName,
    });
    metaEd.propertyIndex.integer.push(property);

    referencedEntity = Object.assign(newIntegerType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.integerType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', () => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });

  it('should have integer type with no referring properties', () => {
    expect(referencedEntity.referringSimpleProperties).toEqual([]);
  });
});

describe('when enhancing shared integer property across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedIntegerProperty;
  let referencedEntity: SharedInteger;
  let integerType: IntegerType;

  beforeAll(() => {
    property = Object.assign(newSharedIntegerProperty(), {
      metaEdName: referencedEntityName,
      parentEntityName,
      namespace: extensionNamespace,
      referencedType: referencedEntityName,
    });
    metaEd.propertyIndex.sharedInteger.push(property);

    referencedEntity = Object.assign(newSharedInteger(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.sharedInteger.set(referencedEntity.metaEdName, referencedEntity);

    integerType = Object.assign(newIntegerType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.integerType.set(referencedEntity.metaEdName, integerType);

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
  });

  it('should have integer type with correct referring properties', () => {
    expect(integerType.referringSimpleProperties).toContain(property);
  });
});
