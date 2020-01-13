import {
  newMetaEdEnvironment,
  newDecimalProperty,
  newSharedDecimalProperty,
  newSharedDecimal,
  newNamespace,
  NoSharedSimple,
} from 'metaed-core';

import { DecimalProperty, MetaEdEnvironment, SharedDecimal, SharedDecimalProperty, Namespace } from 'metaed-core';

import { enhance } from '../../../src/enhancer/property/DecimalReferenceEnhancer';

describe('when enhancing decimal property', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: DecimalProperty;

  beforeAll(() => {
    property = Object.assign(newDecimalProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      namespace,
      parentEntityName,
    });
    metaEd.propertyIndex.decimal.push(property);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', (): void => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });
});

describe('when enhancing shared decimal property', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedDecimalProperty;
  let referencedEntity: SharedDecimal;

  beforeAll(() => {
    property = Object.assign(newSharedDecimalProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
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

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', (): void => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(property.referencedEntity.inReferences).toContain(property);
    expect(property.parentEntity.outReferences).toContain(property);
  });
});

describe('when enhancing shared decimal property referring to deprecated shared decimal', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedDecimalProperty;
  let referencedEntity: SharedDecimal;

  beforeAll(() => {
    property = Object.assign(newSharedDecimalProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      parentEntityName,
      namespace,
      referencedType: referencedEntityName,
    });
    metaEd.propertyIndex.sharedDecimal.push(property);

    referencedEntity = Object.assign(newSharedDecimal(), {
      metaEdName: referencedEntityName,
      namespace,
      isDeprecated: true,
    });
    namespace.entity.sharedDecimal.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have deprecation flag set', (): void => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(property.referencedEntityDeprecated).toBe(true);
  });
});

describe('when enhancing decimal property across namespaces', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: DecimalProperty;

  beforeAll(() => {
    property = Object.assign(newDecimalProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
      namespace: extensionNamespace,
      parentEntityName,
    });
    metaEd.propertyIndex.decimal.push(property);

    enhance(metaEd);
  });

  it('should have property with no referenced entity', (): void => {
    expect(property.referencedEntity).toBe(NoSharedSimple);
  });
});

describe('when enhancing shared decimal property across namespaces', (): void => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  const referencedEntityName = 'ReferencedEntityName';
  let property: SharedDecimalProperty;
  let referencedEntity: SharedDecimal;

  beforeAll(() => {
    property = Object.assign(newSharedDecimalProperty(), {
      metaEdName: referencedEntityName,
      referencedNamespaceName: namespace.namespaceName,
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

    enhance(metaEd);
  });

  it('should have property with correct referenced entity', (): void => {
    expect(property.referencedEntity).toBe(referencedEntity);
    expect(property.referencedEntity.inReferences).toContain(property);
    expect(property.parentEntity.outReferences).toContain(property);
  });
});
