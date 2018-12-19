import { newMetaEdEnvironment, newInterchangeItem, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance } from '../../src/enhancer/MergedInterchangeElementOrderEnhancer';
import { newMergedInterchange, addMergedInterchangeToRepository } from '../../src/model/MergedInterchange';
import { enhance as addModelBaseEdfiXsd } from '../../src/model/ModelBase';
import { addEdFiXsdEntityRepositoryTo } from '../../src/model/EdFiXsdEntityRepository';

describe('when MergedInterchangeElementOrderEnhancer enhances MergedInterchanges with elements differing by xsdName', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  const extensionNamespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension: 'EXTENSION',
    isExtension: true,
  });
  metaEd.namespace.set(extensionNamespace.namespaceName, extensionNamespace);
  extensionNamespace.dependencies.push(namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);

  const interchangeName = 'InterchangeName';
  const coreOnlyInterchangeItemName = 'CoreOnlyInterchangeItemName';
  const extensionOnlyInterchangeItemName = 'ExtensionOnlyInterchangeItemName';
  const extendedInterchangeItemName = 'ExtendedInterchangeItemName';
  const xsdType = 'XsdType';
  let coreMergedInterchange;
  let extensionMergedInterchange;

  beforeAll(() => {
    coreMergedInterchange = Object.assign(newMergedInterchange(), {
      metaEdName: interchangeName,
      namespace,
      repositoryId: interchangeName,
      elements: [
        Object.assign(newInterchangeItem(), {
          metaEdName: extendedInterchangeItemName,
          data: {
            edfiXsd: {
              xsdName: extendedInterchangeItemName,
              xsdType,
            },
          },
        }),
        Object.assign(newInterchangeItem(), {
          metaEdName: coreOnlyInterchangeItemName,
          data: {
            edfiXsd: {
              xsdName: coreOnlyInterchangeItemName,
              xsdType,
            },
          },
        }),
      ],
    });

    extensionMergedInterchange = Object.assign(newMergedInterchange(), {
      metaEdName: interchangeName,
      repositoryId: interchangeName,
      namespace: extensionNamespace,
      elements: [
        Object.assign(newInterchangeItem(), {
          metaEdName: extensionOnlyInterchangeItemName,
          data: {
            edfiXsd: {
              xsdName: extensionOnlyInterchangeItemName,
              xsdType,
            },
          },
        }),
        Object.assign(newInterchangeItem(), {
          metaEdName: extendedInterchangeItemName,
          data: {
            edfiXsd: {
              xsdName: extendedInterchangeItemName,
              xsdType,
            },
          },
        }),
      ],
    });
    addMergedInterchangeToRepository(metaEd, coreMergedInterchange);
    addMergedInterchangeToRepository(metaEd, extensionMergedInterchange);

    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have correct core interchange item order', () => {
    expect(coreMergedInterchange.orderedElements.length).toBe(2);
    expect(coreMergedInterchange.orderedElements[0].metaEdName).toBe(extendedInterchangeItemName);
    expect(coreMergedInterchange.orderedElements[1].metaEdName).toBe(coreOnlyInterchangeItemName);
  });

  it('should have correct extension interchange item order', () => {
    expect(extensionMergedInterchange.orderedElements.length).toBe(2);
    expect(extensionMergedInterchange.orderedElements[0].metaEdName).toBe(extendedInterchangeItemName);
    expect(extensionMergedInterchange.orderedElements[1].metaEdName).toBe(extensionOnlyInterchangeItemName);
  });
});
