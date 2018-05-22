// @flow
import { newMetaEdEnvironment, newNamespace, newDescriptor } from 'metaed-core';
import type { MetaEdEnvironment, Namespace, Descriptor } from 'metaed-core';
import { enhance, descriptorInterchangeName } from '../../src/enhancer/AddDescriptorInterchangeEnhancer';
import { addEdFiXsdEntityRepositoryTo } from '../../src/model/EdFiXsdEntityRepository';
import { edfiXsdRepositoryForNamespace } from '../../src/enhancer/EnhancerHelper';
import type { MergedInterchange } from '../../src/model/MergedInterchange';

describe('when running with one descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'edfi';
  const descriptorBaseName: string = 'DescriptorBaseName';
  const descriptorName: string = 'DescriptorName';
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
          xsd_MetaEdNameWithExtension: descriptorBaseName,
          xsd_DescriptorName: descriptorName,
          xsd_DescriptorNameWithExtension: 'XsdDescriptorNameExtension',
          xsd_IsMapType: false,
          xsd_HasPropertiesOrMapType: true,
        },
      },
    });
    namespace.entity.descriptor.set(descriptor.metaEdName, descriptor);

    enhance(metaEd);
  });

  it('should create only the one descriptor interchange element', () => {
    const entity: MergedInterchange = edfiXsdRepositoryForNamespace(metaEd, namespace).mergedInterchange.get(
      descriptorInterchangeName,
    );
    expect(entity.elements.length).toBe(1);
    expect(entity.elements[0].metaEdName).toBe(descriptorName);
  });

  it('should not create extension descriptor interchange element', () => {
    expect(edfiXsdRepositoryForNamespace(metaEd, namespace).mergedInterchange.size).toBe(1);
  });
});

describe('when running with one extension descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'edfi';
  const descriptorBaseName: string = 'DescriptorBaseName';
  const descriptorName: string = 'DescriptorName';
  const extensionDescriptorBaseName: string = 'ExtensionDescriptorBaseName';
  const extensionDescriptorName: string = 'ExtensionDescriptorName';
  const extensionNamespaceName: string = 'namespace';
  const projectExtension: string = 'EXTENSION';
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
          xsd_MetaEdNameWithExtension: descriptorBaseName,
          xsd_DescriptorName: descriptorName,
          xsd_DescriptorNameWithExtension: 'XsdDescriptorNameExtension',
          xsd_IsMapType: false,
          xsd_HasPropertiesOrMapType: false,
        },
      },
    });
    namespace.entity.descriptor.set(descriptor.metaEdName, descriptor);

    const extensionDescriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: extensionDescriptorBaseName,
      namespace: extensionNamespace,
      data: {
        edfiXsd: {
          xsd_MetaEdNameWithExtension: `${projectExtension}-${descriptorBaseName}`,
          xsd_DescriptorName: extensionDescriptorName,
          xsd_DescriptorNameWithExtension: 'XsdDescriptorNameExtension',
          xsd_IsMapType: false,
          xsd_HasPropertiesOrMapType: false,
        },
      },
    });
    extensionNamespace.entity.descriptor.set(extensionDescriptor.metaEdName, extensionDescriptor);

    enhance(metaEd);
  });

  it('should create two interchanges', () => {
    expect(edfiXsdRepositoryForNamespace(metaEd, namespace).mergedInterchange.size).toBe(1);
    expect(edfiXsdRepositoryForNamespace(metaEd, extensionNamespace).mergedInterchange.size).toBe(1);
  });

  it('should create one core descriptor interchange element', () => {
    const entity: MergedInterchange = edfiXsdRepositoryForNamespace(metaEd, namespace).mergedInterchange.get(
      descriptorInterchangeName,
    );
    expect(entity.elements.length).toBe(1);
    expect(entity.elements[0].metaEdName).toBe(descriptorName);
  });

  it('should create one extension descriptor interchange element', () => {
    const entity: MergedInterchange = edfiXsdRepositoryForNamespace(metaEd, extensionNamespace).mergedInterchange.get(
      `${projectExtension}-${descriptorInterchangeName}`,
    );
    expect(entity.namespace.isExtension).toBe(true);
    expect(entity.elements.length).toBe(2);
    expect(entity.elements[0].metaEdName).toBe(descriptorName);
    expect(entity.elements[1].metaEdName).toBe(extensionDescriptorName);
  });
});

describe('when running with no descriptors', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName: string = 'edfi';
  const namespace: Namespace = Object.assign(newNamespace(), {
    namespaceName,
  });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  beforeAll(() => {
    enhance(metaEd);
  });

  it('should not create descriptor interchange element', () => {
    expect(edfiXsdRepositoryForNamespace(metaEd, namespace).mergedInterchange.size).toBe(0);
  });
});
