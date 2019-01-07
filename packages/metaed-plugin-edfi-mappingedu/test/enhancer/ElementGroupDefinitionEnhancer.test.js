// @flow
import type { Namespace, MetaEdEnvironment } from 'metaed-core';
import { newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { enhance } from '../../src/enhancer/ElementGroupDefinitionEnhancer';
import {
  dataStandardElementGroupName,
  dataStandardNamespaceName,
  pluginEnvironmentRepositoryForNamespace,
} from '../../src/enhancer/EnhancerHelper';
import { addEdFiMappingEduRepositoryTo } from '../../src/model/EdFiMappingEduRepository';
import type { ElementGroupDefinition } from '../../src/model/ElementGroupDefinition';
import type { EdFiMappingEduRepository } from '../../src/model/EdFiMappingEduRepository';

describe('when enhancing core', () => {
  const projectName: string = 'Ed-Fi';
  let pluginNamespace: EdFiMappingEduRepository;

  // Core | Ed-Fi Core
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName: dataStandardNamespaceName,
      projectName,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);

    enhance(metaEd);

    pluginNamespace = (pluginEnvironmentRepositoryForNamespace(metaEd, namespace): any);
  });

  it('should create one element group definition', () => {
    expect(pluginNamespace.elementGroupDefinitions).toHaveLength(1);
  });

  it('should create core element group definition', () => {
    const elementGroupDefinition: ElementGroupDefinition = pluginNamespace.elementGroupDefinitions[0];
    expect(elementGroupDefinition).toBeDefined();
    expect(elementGroupDefinition.elementGroup).toBe(dataStandardElementGroupName);
    expect(elementGroupDefinition.definition).toBe(`${projectName} ${dataStandardElementGroupName}`);
  });
});

describe('when enhancing extension', () => {
  const namespaceName: string = 'NamespaceName';
  const projectName: string = 'ProjectName';
  const extensionEntitySuffix: string = 'ExtensionEntitySuffix';
  let pluginNamespace: EdFiMappingEduRepository;

  // NamespaceName | ProjectName ExtensionEntitySuffix
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: Namespace = {
      ...newNamespace(),
      namespaceName,
      projectName,
      extensionEntitySuffix,
    };
    metaEd.namespace.set(namespace.namespaceName, namespace);
    addEdFiMappingEduRepositoryTo(metaEd);

    enhance(metaEd);

    pluginNamespace = (pluginEnvironmentRepositoryForNamespace(metaEd, namespace): any);
  });

  it('should create one element group definition', () => {
    expect(pluginNamespace.elementGroupDefinitions).toHaveLength(1);
  });

  it('should create extension element group definition', () => {
    const elementGroupDefinition: ElementGroupDefinition = pluginNamespace.elementGroupDefinitions[0];
    expect(elementGroupDefinition).toBeDefined();
    expect(elementGroupDefinition.elementGroup).toBe(namespaceName);
    expect(elementGroupDefinition.definition).toBe(`${projectName} ${extensionEntitySuffix}`);
  });
});

describe('when enhancing core and extension', () => {
  const coreNamespaceName: string = dataStandardNamespaceName;
  const coreProjectName: string = 'Ed-Fi';
  const extensionNamespaceName: string = 'ExtensionNamespaceName';
  const extensionProjectName: string = 'ExtensionProjectName';
  const extensionEntitySuffix: string = 'ExtensionEntitySuffix';
  let corePluginNamespace: EdFiMappingEduRepository;
  let extensionPluginNamespace: EdFiMappingEduRepository;

  // Core          | Ed-Fi Core
  // NamespaceName | ProjectName ExtensionEntitySuffix
  beforeAll(() => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const coreNamespace: Namespace = {
      ...newNamespace(),
      namespaceName: coreNamespaceName,
      projectName: coreProjectName,
    };
    const extensionNamespace: Namespace = {
      ...newNamespace(),
      namespaceName: extensionNamespaceName,
      projectName: extensionProjectName,
      extensionEntitySuffix,
    };
    metaEd.namespace.set(coreNamespace.namespaceName, coreNamespace);
    metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
    addEdFiMappingEduRepositoryTo(metaEd);

    enhance(metaEd);

    corePluginNamespace = (pluginEnvironmentRepositoryForNamespace(metaEd, coreNamespace): any);
    extensionPluginNamespace = (pluginEnvironmentRepositoryForNamespace(metaEd, extensionNamespace): any);
  });

  it('should create two element group definitions', () => {
    expect(corePluginNamespace.elementGroupDefinitions).toHaveLength(1);
    expect(extensionPluginNamespace.elementGroupDefinitions).toHaveLength(1);
  });

  it('should create core element group definition', () => {
    const elementGroupDefinition: ElementGroupDefinition = corePluginNamespace.elementGroupDefinitions[0];
    expect(elementGroupDefinition).toBeDefined();
    expect(elementGroupDefinition.elementGroup).toBe(dataStandardElementGroupName);
    expect(elementGroupDefinition.definition).toBe(`${coreProjectName} ${dataStandardElementGroupName}`);
  });

  it('should create extension element group definition', () => {
    const elementGroupDefinition: ElementGroupDefinition = extensionPluginNamespace.elementGroupDefinitions[0];
    expect(elementGroupDefinition).toBeDefined();
    expect(elementGroupDefinition.elementGroup).toBe(extensionNamespaceName);
    expect(elementGroupDefinition.definition).toBe(`${extensionProjectName} ${extensionEntitySuffix}`);
  });
});
