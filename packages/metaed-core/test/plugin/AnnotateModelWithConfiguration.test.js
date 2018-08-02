// @flow
import { annotateModelWithConfiguration } from '../../src/plugin/AnnotateModelWithConfiguration';
import { newNamespace } from '../../src/model/Namespace';
import { newDomainEntity } from '../../src/model/DomainEntity';
import { newAssociation } from '../../src/model/Association';
import type { Namespace } from '../../src/model/Namespace';
import type { DomainEntity } from '../../src/model/DomainEntity';
import type { Association } from '../../src/model/Association';
import { addEntityForNamespace } from '../../src/model/EntityRepository';
import type { PluginConfiguration } from '../../src/plugin/PluginConfiguration';
import type { PluginEnvironment } from '../../src/plugin/PluginEnvironment';
import { newPluginEnvironment } from '../../src/plugin/PluginEnvironment';
import type { ValidationFailure } from '../../src/validator/ValidationFailure';

function namespaceRepository(...namespaces: Array<Namespace>): Map<string, Namespace> {
  const stringNamespacePairs = namespaces.map((namespace: Namespace) => [namespace.namespaceName, namespace]);
  return new Map(stringNamespacePairs);
}

describe('when config rule is plugin-wide', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'abc' };
  const domainEntity: DomainEntity = { ...newDomainEntity(), namespace, metaEdName: 'DomainEntityName' };
  addEntityForNamespace(domainEntity);
  const association: Association = { ...newAssociation(), namespace, metaEdName: 'AssociationName' };
  addEntityForNamespace(association);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBe('info');
  });

  it('should not annotate entities', () => {
    expect(domainEntity.config.pluginName).toBeUndefined();
    expect(association.config.pluginName).toBeUndefined();
  });
});

describe('when multiple config rules are plugin-wide and the data does not overlap', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          data: {
            explainer: 'info',
          },
        },
        {
          rule: 'rule456',
          data: {
            special: 'sauce',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'abc' };
  const domainEntity: DomainEntity = { ...newDomainEntity(), namespace, metaEdName: 'DomainEntityName' };
  addEntityForNamespace(domainEntity);
  const association: Association = { ...newAssociation(), namespace, metaEdName: 'AssociationName' };
  addEntityForNamespace(association);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should annotate plugin environment with first rule', () => {
    expect(pluginEnvironment.config.explainer).toBe('info');
  });

  it('should annotate plugin environment with second rule', () => {
    expect(pluginEnvironment.config.special).toBe('sauce');
  });

  it('should not annotate entities', () => {
    expect(domainEntity.config.pluginName).toBeUndefined();
    expect(association.config.pluginName).toBeUndefined();
  });
});

describe('when multiple config rules are plugin-wide and the data does overlap', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          data: {
            explainer: ['info'],
          },
        },
        {
          rule: 'rule456',
          data: {
            explainer: ['sauce'],
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'abc' };
  const domainEntity: DomainEntity = { ...newDomainEntity(), namespace, metaEdName: 'DomainEntityName' };
  addEntityForNamespace(domainEntity);
  const association: Association = { ...newAssociation(), namespace, metaEdName: 'AssociationName' };
  addEntityForNamespace(association);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should annotate plugin environment with two elements', () => {
    expect(pluginEnvironment.config.explainer).toHaveLength(2);
  });

  it('should annotate plugin environment with first rule', () => {
    expect(pluginEnvironment.config.explainer).toContain('info');
  });

  it('should annotate plugin environment with second rule', () => {
    expect(pluginEnvironment.config.explainer).toContain('sauce');
  });

  it('should not annotate entities', () => {
    expect(domainEntity.config.pluginName).toBeUndefined();
    expect(association.config.pluginName).toBeUndefined();
  });
});

describe('when config rule is for a single entity type', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: {
            entity: 'domainEntity',
          },
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'abc' };
  const domainEntity: DomainEntity = { ...newDomainEntity(), namespace, metaEdName: 'DomainEntityName' };
  addEntityForNamespace(domainEntity);
  const association: Association = { ...newAssociation(), namespace, metaEdName: 'AssociationName' };
  addEntityForNamespace(association);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should annotate domainEntity', () => {
    expect(domainEntity.config.pluginName.explainer).toBe('info');
  });

  it('should not annotate association', () => {
    expect(association.config.pluginName).toBeUndefined();
  });
});

describe('when config rule is for multiple entity type', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: {
            entity: ['domainEntity', 'association'],
          },
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'abc' };
  const domainEntity: DomainEntity = { ...newDomainEntity(), namespace, metaEdName: 'DomainEntityName' };
  addEntityForNamespace(domainEntity);
  const association: Association = { ...newAssociation(), namespace, metaEdName: 'AssociationName' };
  addEntityForNamespace(association);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should annotate domainEntity', () => {
    expect(domainEntity.config.pluginName.explainer).toBe('info');
  });

  it('should annotate association', () => {
    expect(association.config.pluginName.explainer).toBe('info');
  });
});

describe('when config rule is for a single entity type in a core namespace', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: {
            entity: 'domainEntity',
            core: true,
          },
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi', isExtension: false };
  const extensionNamespace: Namespace = { ...newNamespace(), namespaceName: 'extension', isExtension: true };
  const domainEntity: DomainEntity = { ...newDomainEntity(), namespace, metaEdName: 'DomainEntityName' };
  addEntityForNamespace(domainEntity);
  const domainEntityInExtension: DomainEntity = {
    ...newDomainEntity(),
    namespace: extensionNamespace,
    metaEdName: 'DomainEntityInExtensionName',
  };
  addEntityForNamespace(domainEntityInExtension);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace, extensionNamespace),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should annotate domainEntity in core', () => {
    expect(domainEntity.config.pluginName.explainer).toBe('info');
  });

  it('should not annotate domainEntity in extension', () => {
    expect(domainEntityInExtension.config.pluginName).toBeUndefined();
  });
});

describe('when config rule is for a single entity type in an extension namespace', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: {
            entity: 'domainEntity',
            extensions: true,
          },
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi', isExtension: false };
  const extensionNamespace1: Namespace = { ...newNamespace(), namespaceName: 'extension1', isExtension: true };
  const extensionNamespace2: Namespace = { ...newNamespace(), namespaceName: 'extension2', isExtension: true };

  const domainEntity: DomainEntity = { ...newDomainEntity(), namespace, metaEdName: 'DomainEntityName' };
  addEntityForNamespace(domainEntity);
  const domainEntityInExtension1: DomainEntity = {
    ...newDomainEntity(),
    namespace: extensionNamespace1,
    metaEdName: 'DomainEntityInExtension1Name',
  };
  addEntityForNamespace(domainEntityInExtension1);
  const domainEntityInExtension2: DomainEntity = {
    ...newDomainEntity(),
    namespace: extensionNamespace2,
    metaEdName: 'DomainEntityInExtension2Name',
  };
  addEntityForNamespace(domainEntityInExtension2);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace, extensionNamespace1, extensionNamespace2),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should not annotate domainEntity in core', () => {
    expect(domainEntity.config.pluginName).toBeUndefined();
  });

  it('should annotate domainEntity in extension1', () => {
    expect(domainEntityInExtension1.config.pluginName.explainer).toBe('info');
  });

  it('should annotate domainEntity in extension2', () => {
    expect(domainEntityInExtension2.config.pluginName.explainer).toBe('info');
  });
});

describe('when config rule is for a single entity type in a single named namespace', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: {
            entity: 'domainEntity',
            namespace: 'namespace2',
          },
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace1: Namespace = { ...newNamespace(), namespaceName: 'namespace1' };
  const namespace2: Namespace = { ...newNamespace(), namespaceName: 'namespace2' };
  const domainEntity1: DomainEntity = { ...newDomainEntity(), namespace: namespace1, metaEdName: 'DomainEntity1Name' };
  addEntityForNamespace(domainEntity1);
  const domainEntity2: DomainEntity = {
    ...newDomainEntity(),
    namespace: namespace2,
    metaEdName: 'DomainEntity2Name',
  };
  addEntityForNamespace(domainEntity2);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace1, namespace2),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should not annotate domainEntity1 in namespace1', () => {
    expect(domainEntity1.config.pluginName).toBeUndefined();
  });

  it('should annotate domainEntity2 in namespace2', () => {
    expect(domainEntity2.config.pluginName.explainer).toBe('info');
  });
});

describe('when config rule is for a single entity type in multiple named namespaces', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: {
            entity: 'domainEntity',
            namespace: ['namespace1', 'namespace2'],
          },
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace1: Namespace = { ...newNamespace(), namespaceName: 'namespace1' };
  const namespace2: Namespace = { ...newNamespace(), namespaceName: 'namespace2' };
  const domainEntity1: DomainEntity = { ...newDomainEntity(), namespace: namespace1, metaEdName: 'DomainEntity1Name' };
  addEntityForNamespace(domainEntity1);
  const domainEntity2: DomainEntity = {
    ...newDomainEntity(),
    namespace: namespace2,
    metaEdName: 'DomainEntity2Name',
  };
  addEntityForNamespace(domainEntity2);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace1, namespace2),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should annotate domainEntity1 in namespace1', () => {
    expect(domainEntity1.config.pluginName.explainer).toBe('info');
  });

  it('should annotate domainEntity2 in namespace2', () => {
    expect(domainEntity2.config.pluginName.explainer).toBe('info');
  });
});

describe('when config rule is for a single named namespace that does not exist', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: {
            entity: 'domainEntity',
            namespace: 'invalid',
          },
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace1: Namespace = { ...newNamespace(), namespaceName: 'namespace1' };
  const domainEntity1: DomainEntity = { ...newDomainEntity(), namespace: namespace1, metaEdName: 'DomainEntity1Name' };
  addEntityForNamespace(domainEntity1);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace1),
  );

  it('should not be valid', () => {
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchSnapshot();
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should not annotate domainEntity1 in namespace1', () => {
    expect(domainEntity1.config.pluginName).toBeUndefined();
  });
});

describe('when config rule is for a single entity type in a single named namespace with a specific name', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: {
            entity: 'domainEntity',
            namespace: 'abc',
            entityName: 'DomainEntity1Name',
          },
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'abc' };
  const domainEntity1: DomainEntity = { ...newDomainEntity(), namespace, metaEdName: 'DomainEntity1Name' };
  addEntityForNamespace(domainEntity1);
  const domainEntity2: DomainEntity = {
    ...newDomainEntity(),
    namespace,
    metaEdName: 'DomainEntity2Name',
  };
  addEntityForNamespace(domainEntity2);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should annotate domainEntity1', () => {
    expect(domainEntity1.config.pluginName.explainer).toBe('info');
  });

  it('should not annotate domainEntity2', () => {
    expect(domainEntity2.config.pluginName).toBeUndefined();
  });
});

describe('when config rule is for a single entity type in a single named namespace with a list of names', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: {
            entity: 'domainEntity',
            namespace: 'abc',
            entityName: ['DomainEntity1Name', 'DomainEntity2Name'],
          },
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'abc' };
  const domainEntity1: DomainEntity = { ...newDomainEntity(), namespace, metaEdName: 'DomainEntity1Name' };
  addEntityForNamespace(domainEntity1);
  const domainEntity2: DomainEntity = {
    ...newDomainEntity(),
    namespace,
    metaEdName: 'DomainEntity2Name',
  };
  addEntityForNamespace(domainEntity2);
  const domainEntity3: DomainEntity = {
    ...newDomainEntity(),
    namespace,
    metaEdName: 'DomainEntity3Name',
  };
  addEntityForNamespace(domainEntity3);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should annotate domainEntity1', () => {
    expect(domainEntity1.config.pluginName.explainer).toBe('info');
  });

  it('should annotate domainEntity2', () => {
    expect(domainEntity2.config.pluginName.explainer).toBe('info');
  });

  it('should not annotate domainEntity3', () => {
    expect(domainEntity3.config.pluginName).toBeUndefined();
  });
});

describe('when config rule is for a single entity type in a single named namespace with a specific name with no match', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: {
            entity: 'domainEntity',
            namespace: 'abc',
            entityName: 'invalid',
          },
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace: Namespace = { ...newNamespace(), namespaceName: 'abc' };
  const domainEntity1: DomainEntity = { ...newDomainEntity(), namespace, metaEdName: 'DomainEntity1Name' };
  addEntityForNamespace(domainEntity1);
  const domainEntity2: DomainEntity = {
    ...newDomainEntity(),
    namespace,
    metaEdName: 'DomainEntity2Name',
  };
  addEntityForNamespace(domainEntity2);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace),
  );

  it('should not be valid', () => {
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchSnapshot();
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should not annotate domainEntity1', () => {
    expect(domainEntity1.config.pluginName).toBeUndefined();
  });

  it('should not annotate domainEntity2', () => {
    expect(domainEntity2.config.pluginName).toBeUndefined();
  });
});

describe('when config rule is for a single entity type in multiple extension namespaces with duplicate names', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: {
            entity: 'domainEntity',
            extensions: true,
            entityName: ['DomainEntityName'],
          },
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace1: Namespace = { ...newNamespace(), namespaceName: 'abc', isExtension: true };
  const namespace2: Namespace = { ...newNamespace(), namespaceName: 'def', isExtension: true };
  const domainEntity1: DomainEntity = { ...newDomainEntity(), namespace: namespace1, metaEdName: 'DomainEntityName' };
  addEntityForNamespace(domainEntity1);
  const domainEntity2: DomainEntity = {
    ...newDomainEntity(),
    namespace: namespace2,
    metaEdName: 'DomainEntityName',
  };
  addEntityForNamespace(domainEntity2);
  const domainEntity3: DomainEntity = {
    ...newDomainEntity(),
    namespace: namespace2,
    metaEdName: 'DomainEntity3Name',
  };
  addEntityForNamespace(domainEntity3);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace1, namespace2),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should annotate domainEntity1', () => {
    expect(domainEntity1.config.pluginName.explainer).toBe('info');
  });

  it('should annotate domainEntity2', () => {
    expect(domainEntity2.config.pluginName.explainer).toBe('info');
  });

  it('should not annotate domainEntity3', () => {
    expect(domainEntity3.config.pluginName).toBeUndefined();
  });
});

describe('when config rule has multiple match definitions that do not overlap', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: [
            {
              entity: 'domainEntity',
              extensions: true,
            },
            {
              entity: 'domainEntity',
              core: true,
              entityName: 'DomainEntityName',
            },
          ],
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace1: Namespace = { ...newNamespace(), namespaceName: 'edfi', isExtension: false };
  const namespace2: Namespace = { ...newNamespace(), namespaceName: 'def', isExtension: true };
  const domainEntity1: DomainEntity = { ...newDomainEntity(), namespace: namespace1, metaEdName: 'DomainEntityName' };
  addEntityForNamespace(domainEntity1);
  const domainEntity2: DomainEntity = {
    ...newDomainEntity(),
    namespace: namespace1,
    metaEdName: 'NotDomainEntityName',
  };
  addEntityForNamespace(domainEntity2);
  const domainEntity3: DomainEntity = {
    ...newDomainEntity(),
    namespace: namespace2,
    metaEdName: 'DomainEntity3Name',
  };
  addEntityForNamespace(domainEntity3);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace1, namespace2),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should annotate domainEntity1', () => {
    expect(domainEntity1.config.pluginName.explainer).toBe('info');
  });

  it('should not annotate domainEntity2', () => {
    expect(domainEntity2.config.pluginName).toBeUndefined();
  });

  it('should not annotate domainEntity3', () => {
    expect(domainEntity3.config.pluginName.explainer).toBe('info');
  });
});

describe('when config rule has multiple match definitions that overlap', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: [
            {
              entity: 'domainEntity',
              core: true,
            },
            {
              entity: 'domainEntity',
              core: true,
              entityName: 'DomainEntityName',
            },
          ],
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace1: Namespace = { ...newNamespace(), namespaceName: 'edfi', isExtension: false };
  const namespace2: Namespace = { ...newNamespace(), namespaceName: 'def', isExtension: true };
  const domainEntity1: DomainEntity = { ...newDomainEntity(), namespace: namespace1, metaEdName: 'DomainEntityName' };
  addEntityForNamespace(domainEntity1);
  const domainEntity2: DomainEntity = {
    ...newDomainEntity(),
    namespace: namespace1,
    metaEdName: 'NotDomainEntityName',
  };
  addEntityForNamespace(domainEntity2);
  const domainEntity3: DomainEntity = {
    ...newDomainEntity(),
    namespace: namespace2,
    metaEdName: 'DomainEntity3Name',
  };
  addEntityForNamespace(domainEntity3);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace1, namespace2),
  );

  it('should be valid', () => {
    expect(result).toHaveLength(0);
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should annotate domainEntity1', () => {
    expect(domainEntity1.config.pluginName.explainer).toBe('info');
  });

  it('should not annotate domainEntity2', () => {
    expect(domainEntity2.config.pluginName.explainer).toBe('info');
  });

  it('should not annotate domainEntity3', () => {
    expect(domainEntity3.config.pluginName).toBeUndefined();
  });
});

describe('when config rule has multiple match definitions where one is invalid', () => {
  const pluginConfiguration: PluginConfiguration = {
    filepath: 'file/path',
    configObject: {
      config: [
        {
          rule: 'rule123',
          matches: [
            {
              entity: 'domainEntity',
              core: true,
            },
            {
              entity: 'domainEntity',
              core: true,
              entityName: 'invalid',
            },
          ],
          data: {
            explainer: 'info',
          },
        },
      ],
    },
  };
  const pluginEnvironment: PluginEnvironment = { ...newPluginEnvironment(), shortName: 'pluginName' };
  const namespace1: Namespace = { ...newNamespace(), namespaceName: 'edfi', isExtension: false };
  const namespace2: Namespace = { ...newNamespace(), namespaceName: 'def', isExtension: true };
  const domainEntity1: DomainEntity = { ...newDomainEntity(), namespace: namespace1, metaEdName: 'DomainEntityName' };
  addEntityForNamespace(domainEntity1);
  const domainEntity2: DomainEntity = {
    ...newDomainEntity(),
    namespace: namespace1,
    metaEdName: 'NotDomainEntityName',
  };
  addEntityForNamespace(domainEntity2);
  const domainEntity3: DomainEntity = {
    ...newDomainEntity(),
    namespace: namespace2,
    metaEdName: 'DomainEntity3Name',
  };
  addEntityForNamespace(domainEntity3);

  const result: Array<ValidationFailure> = annotateModelWithConfiguration(
    pluginConfiguration,
    pluginEnvironment,
    namespaceRepository(namespace1, namespace2),
  );

  it('should not be valid', () => {
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchSnapshot();
  });

  it('should not annotate plugin environment', () => {
    expect(pluginEnvironment.config.explainer).toBeUndefined();
  });

  it('should annotate domainEntity1', () => {
    expect(domainEntity1.config.pluginName.explainer).toBe('info');
  });

  it('should not annotate domainEntity2', () => {
    expect(domainEntity2.config.pluginName.explainer).toBe('info');
  });

  it('should not annotate domainEntity3', () => {
    expect(domainEntity3.config.pluginName).toBeUndefined();
  });
});
