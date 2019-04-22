import {
  newMetaEdEnvironment,
  newStringProperty,
  newSharedStringProperty,
  newStringType,
  newSharedString,
  newNamespace,
  NoSharedSimple,
} from 'metaed-core';

import { MetaEdEnvironment, SharedString, SharedStringProperty, StringProperty, StringType, Namespace } from 'metaed-core';

import { enhance } from '../../../src/enhancer/property/StringReferenceEnhancer';

describe('when enhancing string property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: StringProperty;
  let referencedEntity: StringType;

  beforeAll(() => {
    property = Object.assign(newStringProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      namespace,
      parentEntityName,
    });
    metaEd.propertyIndex.string.push(property);

    referencedEntity = Object.assign(newStringType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.stringType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', () => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });

  it('should have string type with no referring properties', () => {
    expect(referencedEntity.referringSimpleProperties).toEqual([]);
  });
});

describe('when enhancing shared string property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedStringProperty;
  let referencedEntity: SharedString;
  let stringType: StringType;

  beforeAll(() => {
    property = Object.assign(newSharedStringProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      parentEntityName,
      namespace,
      referencedType: referencedEntityName,
    });
    metaEd.propertyIndex.sharedString.push(property);

    referencedEntity = Object.assign(newSharedString(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.sharedString.set(referencedEntity.metaEdName, referencedEntity);

    stringType = Object.assign(newStringType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.stringType.set(referencedEntity.metaEdName, stringType);

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(property.referencedEntity.inReferences).toContain(property);
    expect(property.parentEntity.outReferences).toContain(property);
  });

  it('should have string type with correct referring properties', () => {
    expect(stringType.referringSimpleProperties).toContain(property);
  });
});

describe('when enhancing string property across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: StringProperty;
  let referencedEntity: StringType;

  beforeAll(() => {
    property = Object.assign(newStringProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      namespace: extensionNamespace,
      parentEntityName,
    });
    metaEd.propertyIndex.string.push(property);

    referencedEntity = Object.assign(newStringType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.stringType.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', () => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });

  it('should have string type with no referring properties', () => {
    expect(referencedEntity.referringSimpleProperties).toEqual([]);
  });
});

describe('when enhancing shared string property across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedStringProperty;
  let referencedEntity: SharedString;
  let stringType: StringType;

  beforeAll(() => {
    property = Object.assign(newSharedStringProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      parentEntityName,
      namespace: extensionNamespace,
      referencedType: referencedEntityName,
    });
    metaEd.propertyIndex.sharedString.push(property);

    referencedEntity = Object.assign(newSharedString(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.sharedString.set(referencedEntity.metaEdName, referencedEntity);

    stringType = Object.assign(newStringType(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.stringType.set(referencedEntity.metaEdName, stringType);

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', () => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(property.referencedEntity.inReferences).toContain(property);
    expect(property.parentEntity.outReferences).toContain(property);
  });

  it('should have string type with correct referring properties', () => {
    expect(stringType.referringSimpleProperties).toContain(property);
  });
});
