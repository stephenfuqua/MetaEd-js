// @flow
import { newMetaEdEnvironment, newPluginEnvironment, newNamespace, newDescriptor } from 'metaed-core';
import type { MetaEdEnvironment, Namespace, Descriptor } from 'metaed-core';
import { enhance, descriptorInterchangeName } from '../../src/enhancer/AddDescriptorInterchangeEnhancer';
import { newEdFiXsdEntityRepository } from '../../src/model/EdFiXsdEntityRepository';
import { pluginEnvironment } from '../../src/enhancer/EnhancerHelper';
import type { MergedInterchange } from '../../src/model/MergedInterchange';

describe('when running with one descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.plugin.set(
    'edfiXsd',
    Object.assign(newPluginEnvironment(), {
      entity: newEdFiXsdEntityRepository(),
    }),
  );
  const namespaceName: string = 'edfi';
  const descriptorBaseName: string = 'DescriptorBaseName';
  const descriptorName: string = 'DescriptorName';

  beforeAll(() => {
    const coreNamespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
    });
    metaEd.entity.namespace.set(coreNamespace.namespaceName, coreNamespace);

    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorName,
      namespace: coreNamespace,
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
    metaEd.entity.descriptor.set(descriptor.metaEdName, descriptor);

    enhance(metaEd);
  });

  it('should create only the one descriptor interchange element', () => {
    const entity: MergedInterchange = pluginEnvironment(metaEd).entity.mergedInterchange.get(descriptorInterchangeName);
    expect(entity.elements.length).toBe(1);
    expect(entity.elements[0].metaEdName).toBe(descriptorName);
  });

  it('should not create extension descriptor interchange element', () => {
    expect(pluginEnvironment(metaEd).entity.mergedInterchange.size).toBe(1);
  });
});

describe('when running with one extension descriptor', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.plugin.set(
    'edfiXsd',
    Object.assign(newPluginEnvironment(), {
      entity: newEdFiXsdEntityRepository(),
    }),
  );
  const namespaceName: string = 'edfi';
  const descriptorBaseName: string = 'DescriptorBaseName';
  const descriptorName: string = 'DescriptorName';
  const extensionDescriptorBaseName: string = 'ExtensionDescriptorBaseName';
  const extensionDescriptorName: string = 'ExtensionDescriptorName';
  const extensionNamespaceName: string = 'namespace';
  const projectExtension: string = 'EXTENSION';

  beforeAll(() => {
    const coreNamespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
    });
    metaEd.entity.namespace.set(coreNamespace.namespaceName, coreNamespace);

    const extensionNamespace: Namespace = Object.assign(newNamespace(), {
      namespaceName: extensionNamespaceName,
      projectExtension,
      isExtension: true,
    });
    metaEd.entity.namespace.set(extensionNamespace.namespaceName, extensionNamespace);

    const descriptor: Descriptor = Object.assign(newDescriptor(), {
      metaEdName: descriptorBaseName,
      namespace: coreNamespace,
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
    metaEd.entity.descriptor.set(descriptor.metaEdName, descriptor);

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
    metaEd.entity.descriptor.set(extensionDescriptor.metaEdName, extensionDescriptor);

    enhance(metaEd);
  });

  it('should create two interchanges', () => {
    expect(pluginEnvironment(metaEd).entity.mergedInterchange.size).toBe(2);
  });

  it('should create one core descriptor interchange element', () => {
    const entity: MergedInterchange = pluginEnvironment(metaEd).entity.mergedInterchange.get(descriptorInterchangeName);
    expect(entity.elements.length).toBe(1);
    expect(entity.elements[0].metaEdName).toBe(descriptorName);
  });

  it('should create one extension descriptor interchange element', () => {
    const entity: MergedInterchange = pluginEnvironment(metaEd).entity.mergedInterchange.get(
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
  metaEd.plugin.set(
    'edfiXsd',
    Object.assign(newPluginEnvironment(), {
      entity: newEdFiXsdEntityRepository(),
    }),
  );
  const namespaceName: string = 'edfi';

  beforeAll(() => {
    const coreNamespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
    });
    metaEd.entity.namespace.set(coreNamespace.namespaceName, coreNamespace);

    enhance(metaEd);
  });

  it('should not create descriptor interchange element', () => {
    expect(pluginEnvironment(metaEd).entity.mergedInterchange.size).toBe(0);
  });
});
