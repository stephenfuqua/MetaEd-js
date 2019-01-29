import { newDescriptor, newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { Descriptor, MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../../src/model/Descriptor';

describe('when Descriptor enhances descriptor entity', () => {
  const descriptorName = 'DescriptorName';
  let descriptor: Descriptor;
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorName,
      namespace,
    });

    namespace.entity.descriptor.set(descriptorName, descriptor);
    enhance(metaEd);
  });

  it('should have ods descriptor name with descriptor suffix', () => {
    expect(descriptor.data.edfiOds.odsDescriptorName).toBe(`${descriptorName}Descriptor`);
  });

  it('should have false ods is map type', () => {
    expect(descriptor.data.edfiOds.odsIsMapType).toBe(false);
  });
});

describe('when Descriptor enhances descriptor entity with descriptor suffix', () => {
  const descriptorName = 'DescriptorName';
  let descriptor: Descriptor;
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    descriptor = Object.assign(newDescriptor(), {
      metaEdName: `${descriptorName}Descriptor`,
      namespace,
    });

    namespace.entity.descriptor.set(descriptorName, descriptor);
    enhance(metaEd);
  });

  it('should have ods descriptor name with normalized suffix', () => {
    expect(descriptor.data.edfiOds.odsDescriptorName).toBe(`${descriptorName}Descriptor`);
  });

  it('should have false ods is map type', () => {
    expect(descriptor.data.edfiOds.odsIsMapType).toBe(false);
  });
});

describe('when Descriptor enhances descriptor entity with is map type required', () => {
  let descriptor: Descriptor;
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    descriptor = Object.assign(newDescriptor(), {
      isMapTypeRequired: true,
      namespace,
    });

    namespace.entity.descriptor.set('DescriptorName', descriptor);
    enhance(metaEd);
  });

  it('should have true ods is map type', () => {
    expect(descriptor.data.edfiOds.odsIsMapType).toBe(true);
  });
});

describe('when Descriptor enhances descriptor entity with is amp type optional', () => {
  let descriptor: Descriptor;
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'EdFi' };
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.namespace.set(namespace.namespaceName, namespace);

  beforeAll(() => {
    descriptor = Object.assign(newDescriptor(), {
      isMapTypeOptional: true,
      namespace,
    });

    namespace.entity.descriptor.set('DescriptorName', descriptor);
    enhance(metaEd);
  });

  it('should have true ods is map type', () => {
    expect(descriptor.data.edfiOds.odsIsMapType).toBe(true);
  });
});
