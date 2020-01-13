import {
  newMetaEdEnvironment,
  newStringProperty,
  newSharedStringProperty,
  newSharedString,
  newNamespace,
  NoSharedSimple,
} from 'metaed-core';

import { MetaEdEnvironment, SharedString, SharedStringProperty, StringProperty, Namespace } from 'metaed-core';

import { enhance } from '../../../src/enhancer/property/StringReferenceEnhancer';

describe('when enhancing string property', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: StringProperty;

  beforeAll(() => {
    property = Object.assign(newStringProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      namespace,
      parentEntityName,
    });
    metaEd.propertyIndex.string.push(property);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', (): void => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });
});

describe('when enhancing shared string property', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedStringProperty;
  let referencedEntity: SharedString;

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

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', (): void => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(property.referencedEntity.inReferences).toContain(property);
    expect(property.parentEntity.outReferences).toContain(property);
  });
});

describe('when enhancing property referring to deprecated shared string', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedStringProperty;
  let referencedEntity: SharedString;

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
      isDeprecated: true,
    });
    namespace.entity.sharedString.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have deprecation flag set', (): void => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(property.referencedEntityDeprecated).toBe(true);
  });
});

describe('when enhancing string property across namespaces', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: StringProperty;

  beforeAll(() => {
    property = Object.assign(newStringProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      namespace: extensionNamespace,
      parentEntityName,
    });
    metaEd.propertyIndex.string.push(property);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', (): void => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });
});

describe('when enhancing shared string property across namespaces', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedStringProperty;
  let referencedEntity: SharedString;

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

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', (): void => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(property.referencedEntity.inReferences).toContain(property);
    expect(property.parentEntity.outReferences).toContain(property);
  });
});
