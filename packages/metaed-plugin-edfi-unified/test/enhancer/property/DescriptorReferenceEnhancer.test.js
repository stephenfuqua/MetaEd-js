// @flow
import R from 'ramda';
import { newMetaEdEnvironment, newDescriptorProperty, newDescriptor, newNamespace } from 'metaed-core';
import type { MetaEdEnvironment, DescriptorProperty, Descriptor, Namespace } from 'metaed-core';
import { enhance } from '../../../src/enhancer/property/DescriptorReferenceEnhancer';

describe('when enhancing descriptor property', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: DescriptorProperty = Object.assign(newDescriptorProperty(), {
      metaEdName: referencedEntityName,
      namespace,
      parentEntityName,
    });
    metaEd.propertyIndex.descriptor.push(property);

    const parentEntity: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: parentEntityName,
      namespace,
      properties: [property],
    });
    namespace.entity.descriptor.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.descriptor.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.descriptor.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});

describe('when enhancing descriptor property across namespaces', () => {
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', dependencies: [namespace] };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  const parentEntityName: string = 'ParentEntityName';
  const referencedEntityName: string = 'ReferencedEntityName';

  beforeAll(() => {
    const property: DescriptorProperty = Object.assign(newDescriptorProperty(), {
      metaEdName: referencedEntityName,
      namespace: extensionNamespace,
      parentEntityName,
    });
    metaEd.propertyIndex.descriptor.push(property);

    const parentEntity: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: parentEntityName,
      namespace: extensionNamespace,
      properties: [property],
    });
    extensionNamespace.entity.descriptor.set(parentEntity.metaEdName, parentEntity);

    const referencedEntity: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: referencedEntityName,
      namespace,
    });
    namespace.entity.descriptor.set(referencedEntity.metaEdName, referencedEntity);

    enhance(metaEd);
  });

  it('should have no validation failures()', () => {
    const property = R.head(metaEd.propertyIndex.descriptor.filter(p => p.metaEdName === referencedEntityName));
    expect(property).toBeDefined();
    expect(property.referencedEntity.metaEdName).toBe(referencedEntityName);
  });
});