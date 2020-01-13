import {
  newMetaEdEnvironment,
  newShortProperty,
  newSharedShortProperty,
  newSharedInteger,
  newNamespace,
  NoSharedSimple,
} from 'metaed-core';

import { MetaEdEnvironment, SharedInteger, SharedShortProperty, ShortProperty, Namespace } from 'metaed-core';

import { enhance } from '../../../src/enhancer/property/ShortReferenceEnhancer';

describe('when enhancing short property', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: ShortProperty;

  beforeAll(() => {
    property = Object.assign(newShortProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      namespace,
      parentEntityName,
    });
    metaEd.propertyIndex.short.push(property);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', (): void => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });
});

describe('when enhancing shared short property', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedShortProperty;
  let referencedEntity: SharedInteger;

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

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', (): void => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(property.referencedEntity.inReferences).toContain(property);
    expect(property.parentEntity.outReferences).toContain(property);
  });
});

describe('when enhancing property referring to deprecated shared short', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedShortProperty;
  let referencedEntity: SharedInteger;

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
      isDeprecated: true,
    });
    namespace.entity.sharedInteger.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have deprecation flag set', (): void => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(property.referencedEntityDeprecated).toBe(true);
  });
});

describe('when enhancing short property across namespaces', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: ShortProperty;

  beforeAll(() => {
    property = Object.assign(newShortProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      namespace: extensionNamespace,
      parentEntityName,
    });
    metaEd.propertyIndex.short.push(property);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', (): void => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });
});

describe('when enhancing shared short property across namespaces', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedShortProperty;
  let referencedEntity: SharedInteger;

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

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', (): void => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(property.referencedEntity.inReferences).toContain(property);
    expect(property.parentEntity.outReferences).toContain(property);
  });
});
