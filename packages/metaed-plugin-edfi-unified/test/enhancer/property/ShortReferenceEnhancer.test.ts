import {
  newMetaEdEnvironment,
  newShortProperty,
  newSharedShortProperty,
  newIntegerType,
  newSharedInteger,
  newNamespace,
  NoSharedSimple,
} from 'metaed-core';

import { IntegerType, MetaEdEnvironment, SharedInteger, SharedShortProperty, ShortProperty, Namespace } from 'metaed-core';

import { enhance } from '../../../src/enhancer/property/ShortReferenceEnhancer';

describe('when enhancing short property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: ShortProperty;
  let referencedEntity: IntegerType;

  beforeAll(() => {
    property = Object.assign(newShortProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      namespace,
      parentEntityName,
    });
    metaEd.propertyIndex.short.push(property);

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

  it('should have short type with no referring properties', () => {
    expect(referencedEntity.referringSimpleProperties).toEqual([]);
  });
});

describe('when enhancing shared short property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedShortProperty;
  let referencedEntity: SharedInteger;
  let integerType: IntegerType;

  beforeAll(() => {
    property = Object.assign(newSharedShortProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      parentEntityName,
      namespace,
      referencedType: referencedEntityName,
    });
    metaEd.propertyIndex.sharedShort.push(property);

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
    expect(property.referencedEntity.inReferences).toContain(property);
    expect(property.parentEntity.outReferences).toContain(property);
  });

  it('should have short type with correct referring properties', () => {
    expect(integerType.referringSimpleProperties).toContain(property);
  });
});

describe('when enhancing short property across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: ShortProperty;
  let referencedEntity: IntegerType;

  beforeAll(() => {
    property = Object.assign(newShortProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      namespace: extensionNamespace,
      parentEntityName,
    });
    metaEd.propertyIndex.short.push(property);

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

  it('should have short type with no referring properties', () => {
    expect(referencedEntity.referringSimpleProperties).toEqual([]);
  });
});

describe('when enhancing shared short property across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedShortProperty;
  let referencedEntity: SharedInteger;
  let integerType: IntegerType;

  beforeAll(() => {
    property = Object.assign(newSharedShortProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      parentEntityName,
      namespace: extensionNamespace,
      referencedType: referencedEntityName,
    });
    metaEd.propertyIndex.sharedShort.push(property);

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
    expect(property.referencedEntity.inReferences).toContain(property);
    expect(property.parentEntity.outReferences).toContain(property);
  });

  it('should have short type with correct referring properties', () => {
    expect(integerType.referringSimpleProperties).toContain(property);
  });
});
