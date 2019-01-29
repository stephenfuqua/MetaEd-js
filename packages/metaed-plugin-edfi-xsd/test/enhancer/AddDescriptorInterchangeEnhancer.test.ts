import { newMetaEdEnvironment, newNamespace, newDescriptor } from 'metaed-core';
import { MetaEdEnvironment, Namespace, Descriptor } from 'metaed-core';
import { enhance, descriptorInterchangeName } from '../../src/enhancer/AddDescriptorInterchangeEnhancer';
import { addEdFiXsdEntityRepositoryTo, EdFiXsdEntityRepository } from '../../src/model/EdFiXsdEntityRepository';
import { edfiXsdRepositoryForNamespace } from '../../src/enhancer/EnhancerHelper';
import { MergedInterchange } from '../../src/model/MergedInterchange';

describe('when running with one descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'EdFi';
  const descriptorBaseName = 'DescriptorBaseName';
  const descriptorName = 'DescriptorName';
  const namespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
  });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorName,
      namespace,
      data: {
        edfiXsd: {
          xsdMetaEdNameWithExtension: descriptorBaseName,
          xsdDescriptorName: descriptorName,
          xsdDescriptorNameWithExtension: 'XsdDescriptorNameExtension',
          xsdIsMapType: false,
          xsdHasPropertiesOrMapType: true,
        },
      },
    });
    namespace.entity.descriptor.set(descriptor.metaEdName, descriptor);

    enhance(metaEd);
  });

  it('should create only the one descriptor interchange element', () => {
    const entity: MergedInterchange = (edfiXsdRepositoryForNamespace(
      metaEd,
      namespace,
    ) as EdFiXsdEntityRepository).mergedInterchange.get(descriptorInterchangeName) as MergedInterchange;
    expect(entity.elements.length).toBe(1);
    expect(entity.elements[0].metaEdName).toBe(descriptorName);
  });

  it('should not create extension descriptor interchange element', () => {
    expect((edfiXsdRepositoryForNamespace(metaEd, namespace) as EdFiXsdEntityRepository).mergedInterchange.size).toBe(1);
  });
});

describe('when running with one extension descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'EdFi';
  const descriptorBaseName = 'DescriptorBaseName';
  const descriptorName = 'DescriptorName';
  const extensionDescriptorBaseName = 'ExtensionDescriptorBaseName';
  const extensionDescriptorName = 'ExtensionDescriptorName';
  const extensionNamespaceName = 'namespace';
  const projectExtension = 'EXTENSION';
  const namespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
  });
  metaEd.namespace.set(namespace.namespaceName, namespace);

  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: extensionNamespaceName,
    projectExtension,
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  beforeAll(() => {
    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorBaseName,
      namespace,
      data: {
        edfiXsd: {
          xsdMetaEdNameWithExtension: descriptorBaseName,
          xsdDescriptorName: descriptorName,
          xsdDescriptorNameWithExtension: 'XsdDescriptorNameExtension',
          xsdIsMapType: false,
          xsdHasPropertiesOrMapType: false,
        },
      },
    });
    namespace.entity.descriptor.set(descriptor.metaEdName, descriptor);

    const extensionDescriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: extensionDescriptorBaseName,
      namespace: extensionNamespace,
      data: {
        edfiXsd: {
          xsdMetaEdNameWithExtension: `${projectExtension}-${descriptorBaseName}`,
          xsdDescriptorName: extensionDescriptorName,
          xsdDescriptorNameWithExtension: 'XsdDescriptorNameExtension',
          xsdIsMapType: false,
          xsdHasPropertiesOrMapType: false,
        },
      },
    });
    extensionNamespace.entity.descriptor.set(extensionDescriptor.metaEdName, extensionDescriptor);

    enhance(metaEd);
  });

  it('should create two interchanges', () => {
    expect((edfiXsdRepositoryForNamespace(metaEd, namespace) as EdFiXsdEntityRepository).mergedInterchange.size).toBe(1);
    expect(
      (edfiXsdRepositoryForNamespace(metaEd, extensionNamespace) as EdFiXsdEntityRepository).mergedInterchange.size,
    ).toBe(1);
  });

  it('should create one core descriptor interchange element', () => {
    const entity: MergedInterchange = (edfiXsdRepositoryForNamespace(
      metaEd,
      namespace,
    ) as EdFiXsdEntityRepository).mergedInterchange.get(descriptorInterchangeName) as MergedInterchange;
    expect(entity.elements.length).toBe(1);
    expect(entity.elements[0].metaEdName).toBe(descriptorName);
  });

  it('should create one extension descriptor interchange element', () => {
    const entity: MergedInterchange = (edfiXsdRepositoryForNamespace(
      metaEd,
      extensionNamespace,
    ) as EdFiXsdEntityRepository).mergedInterchange.get(
      `${projectExtension}-${descriptorInterchangeName}`,
    ) as MergedInterchange;
    expect(entity.namespace.isExtension).toBe(true);
    expect(entity.elements.length).toBe(2);
    expect(entity.elements[0].metaEdName).toBe(descriptorName);
    expect(entity.elements[1].metaEdName).toBe(extensionDescriptorName);
  });
});

describe('when running with no descriptors', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'EdFi';
  const namespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
  });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  beforeAll(() => {
    enhance(metaEd);
  });

  it('should not create descriptor interchange element', () => {
    expect((edfiXsdRepositoryForNamespace(metaEd, namespace) as EdFiXsdEntityRepository).mergedInterchange.size).toBe(0);
  });
});
