import { Namespace, MetaEdEnvironment } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { newAnnotation, newComplexType, newEnumerationSimpleType } from 'metaed-plugin-edfi-xsd';
import {
  dataStandardElementGroupName,
  dataStandardNamespaceName,
  pluginDescriptorsForNamespace,
  pluginEnumerationsForNamespace,
  pluginEnvironmentRepositoryForNamespace,
} from '../../src/enhancer/EnhancerHelper';
import { enhance } from '../../src/enhancer/EnumerationDefinitionEnhancer';
import { addEdFiMappingEduRepositoryTo } from '../../src/model/EdFiMappingEduRepository';
import { EnumerationDefinition } from '../../src/model/EnumerationDefinition';
import { EdFiMappingEduRepository } from '../../src/model/EdFiMappingEduRepository';

describe('when enhancing descriptor element', () => {
  let pluginNamespace: EdFiMappingEduRepository;
  const descriptorName: string = 'DescriptorName';
  const descriptorDocumentation: string = 'DescriptorDocumentation';

  // Core | DescriptorName | DescriptorDocumentation
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: dataStandardNamespaceName,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);
    pluginDescriptorsForNamespace(metaEd, namespace).set(descriptorName, {
      ...newComplexType(),
      annotation: { ...newAnnotation(), documentation: descriptorDocumentation },
      name: descriptorName,
    });

    enhance(metaEd);

    pluginNamespace = pluginEnvironmentRepositoryForNamespace(metaEd, namespace) as any;
  });

  it('should create one enumeration definition', () => {
    expect(pluginNamespace.enumerationDefinitions).toHaveLength(1);
  });

  it('should create core enumeration definition from descriptor element', () => {
    const enumerationDefinition: EnumerationDefinition = pluginNamespace.enumerationDefinitions[0];
    expect(enumerationDefinition).toBeDefined();
    expect(enumerationDefinition.elementGroup).toBe(dataStandardElementGroupName);
    expect(enumerationDefinition.enumeration).toEqual(descriptorName);
    expect(enumerationDefinition.definition).toBe(descriptorDocumentation);
  });
});

describe('when enhancing enumeration element', () => {
  let pluginNamespace: EdFiMappingEduRepository;
  const enumerationName: string = 'EnumerationName';
  const enumerationDocumentation: string = 'EnumerationDocumentation';

  // Core | EnumerationName | EnumerationDocumentation
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: dataStandardNamespaceName,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);
    pluginEnumerationsForNamespace(metaEd, namespace).set(enumerationName, {
      ...newEnumerationSimpleType(),
      annotation: { ...newAnnotation(), documentation: enumerationDocumentation },
      name: enumerationName,
    });

    enhance(metaEd);

    pluginNamespace = pluginEnvironmentRepositoryForNamespace(metaEd, namespace) as any;
  });

  it('should create one enumeration definition', () => {
    expect(pluginNamespace.enumerationDefinitions).toHaveLength(1);
  });

  it('should create core enumeration definition from enumeration element', () => {
    const enumerationDefinition: EnumerationDefinition = pluginNamespace.enumerationDefinitions[0];
    expect(enumerationDefinition).toBeDefined();
    expect(enumerationDefinition.elementGroup).toBe(dataStandardElementGroupName);
    expect(enumerationDefinition.enumeration).toEqual(enumerationName);
    expect(enumerationDefinition.definition).toBe(enumerationDocumentation);
  });
});

describe('when enhancing descriptor and enumeration elements', () => {
  let pluginNamespace: EdFiMappingEduRepository;
  const descriptorName: string = 'DescriptorName';
  const descriptorDocumentation: string = 'DescriptorDocumentation';
  const enumerationName: string = 'EnumerationName';
  const enumerationDocumentation: string = 'EnumerationDocumentation';

  // Core | DescriptorName | DescriptorDocumentation
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: dataStandardNamespaceName,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);
    pluginDescriptorsForNamespace(metaEd, namespace).set(descriptorName, {
      ...newComplexType(),
      annotation: { ...newAnnotation(), documentation: descriptorDocumentation },
      name: descriptorName,
    });
    pluginEnumerationsForNamespace(metaEd, namespace).set(enumerationName, {
      ...newEnumerationSimpleType(),
      annotation: { ...newAnnotation(), documentation: enumerationDocumentation },
      name: enumerationName,
    });

    enhance(metaEd);

    pluginNamespace = pluginEnvironmentRepositoryForNamespace(metaEd, namespace) as any;
  });

  it('should create two enumeration definitions', () => {
    expect(pluginNamespace.enumerationDefinitions).toHaveLength(2);
  });

  it.each([[descriptorName, descriptorDocumentation, 0], [enumerationName, enumerationDocumentation, 1]])(
    `should create core enumeration definition with name: '%s' and definition: '%s'`,
    (enumeration: string, definition: string, index: number) => {
      const enumerationDefinition: EnumerationDefinition = pluginNamespace.enumerationDefinitions[index];
      expect(enumerationDefinition).toBeDefined();
      expect(enumerationDefinition.elementGroup).toBe(dataStandardElementGroupName);
      expect(enumerationDefinition.enumeration).toEqual(enumeration);
      expect(enumerationDefinition.definition).toBe(definition);
    },
  );
});
