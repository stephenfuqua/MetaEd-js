import {
  newMetaEdEnvironment,
  newAssociation,
  newAssociationSubclass,
  newAssociationExtension,
  newNamespace,
} from 'metaed-core';
import { MetaEdEnvironment, Association, AssociationSubclass, AssociationExtension, Namespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/AssociationExtensionBaseClassEnhancer';

describe('when enhancing association extension referring to association', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  let parentEntity: Association;
  let childEntity: AssociationExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newAssociation(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.association.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newAssociationExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
      baseEntityNamespaceName: parentEntity.namespace.namespaceName,
      namespace,
    });
    namespace.entity.associationExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have correct references', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
    expect(parentEntity.extendedBy).toHaveLength(1);
    expect(parentEntity.extendedBy[0]).toBe(childEntity);
  });
});

describe('when enhancing association extension referring to association subclass', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName = 'ParentEntityName';
  let parentEntity: AssociationSubclass;
  let childEntity: AssociationExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newAssociationSubclass(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.associationSubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newAssociationExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
      baseEntityNamespaceName: parentEntity.namespace.namespaceName,
      namespace,
    });
    namespace.entity.associationExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have correct references', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
    expect(parentEntity.extendedBy).toHaveLength(1);
    expect(parentEntity.extendedBy[0]).toBe(childEntity);
  });
});

describe('when enhancing association extension referring to association across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  let parentEntity: Association;
  let childEntity: AssociationExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newAssociation(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.association.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newAssociationExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
      baseEntityNamespaceName: parentEntity.namespace.namespaceName,
      namespace: extensionNamespace,
    });
    extensionNamespace.entity.associationExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have correct references', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
    expect(parentEntity.extendedBy).toHaveLength(1);
    expect(parentEntity.extendedBy[0]).toBe(childEntity);
  });
});

describe('when enhancing association extension referring to association subclass across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'Extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName = 'ParentEntityName';
  let parentEntity: AssociationSubclass;
  let childEntity: AssociationExtension;

  beforeAll(() => {
    parentEntity = Object.assign(newAssociationSubclass(), {
      metaEdName: parentEntityName,
      namespace,
    });
    namespace.entity.associationSubclass.set(parentEntity.metaEdName, parentEntity);

    childEntity = Object.assign(newAssociationExtension(), {
      metaEdName: parentEntityName,
      baseEntityName: parentEntityName,
      baseEntityNamespaceName: parentEntity.namespace.namespaceName,
      namespace: extensionNamespace,
    });
    extensionNamespace.entity.associationExtension.set(childEntity.metaEdName, childEntity);

    enhance(metaEd);
  });

  it('should have correct references', () => {
    expect(childEntity.baseEntity).toBe(parentEntity);
    expect(parentEntity.extendedBy).toHaveLength(1);
    expect(parentEntity.extendedBy[0]).toBe(childEntity);
  });
});
