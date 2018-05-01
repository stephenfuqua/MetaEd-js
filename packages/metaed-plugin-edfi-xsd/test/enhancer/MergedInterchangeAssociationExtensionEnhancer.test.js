// @flow
import {
  newMetaEdEnvironment,
  newInterchangeItem,
  newNamespace,
  newPluginEnvironment,
  newAssociation,
  newAssociationExtension,
} from 'metaed-core';
import type { MetaEdEnvironment, Association, Namespace } from 'metaed-core';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance } from '../../src/enhancer/MergedInterchangeExtensionEnhancer';
import { newMergedInterchange, addMergedInterchangeToRepository } from '../../src/model/MergedInterchange';
import { enhance as addModelBaseEdfiXsd } from '../../src/model/ModelBase';
import { newEdFiXsdEntityRepository } from '../../src/model/EdFiXsdEntityRepository';
import type { EdFiXsdEntityRepository } from '../../src/model/EdFiXsdEntityRepository';

describe('when enhances MergedInterchange with association extension', () => {
  const plugin = Object.assign(newPluginEnvironment(), {
    entity: newEdFiXsdEntityRepository(),
  });
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  metaEd.plugin.set('edfiXsd', plugin);
  const namespaceName: string = 'edfi';
  const extensionNamespaceName: string = 'extensionNamespace';
  const projectExtension: string = 'EXTENSION';

  const association1Name: string = 'Association1';
  const association1Documentation: string = 'Association1Documentation';

  const interchangeName: string = 'InterchangeName';
  const interchangeDocumentation: string = 'InterchangeDocumentation';
  const interchangeExtendedDocumentation: string = 'InterchangeExtendedDocumentation';
  const interchangeUseCaseDocumentation: string = 'InterchangeUseCaseDocumentation';
  const interchangeItemAssociation1Documentation: string = 'InterchangeItemAssociation1Documentation';

  let associationExtension;

  beforeAll(() => {
    const coreNamespace: Namespace = Object.assign(newNamespace(), {
      namespaceName,
      isExtension: false,
    });

    const extensionNamespace = Object.assign(newNamespace(), {
      namespaceName: extensionNamespaceName,
      projectExtension,
      isExtension: true,
    });

    metaEd.entity.namespace.set(coreNamespace.namespaceName, coreNamespace);
    metaEd.entity.namespace.set(extensionNamespace.namespaceName, extensionNamespace);

    const association: Association = Object.assign(newAssociation(), {
      metaEdName: association1Name,
      documentation: association1Documentation,
      namespace: coreNamespace,
      data: {
        edfiXsd: {},
      },
    });
    metaEd.entity.association.set(association.metaEdName, association);

    associationExtension = Object.assign(newAssociationExtension(), {
      metaEdName: association1Name,
      namespace: extensionNamespace,
      data: {
        edfiXsd: {},
      },
    });
    metaEd.entity.associationExtension.set(associationExtension.metaEdName, associationExtension);

    const coreMergedInterchange = Object.assign(newMergedInterchange(), {
      metaEdName: interchangeName,
      repositoryId: interchangeName,
      documentation: interchangeDocumentation,
      extendedDocumentation: interchangeExtendedDocumentation,
      useCaseDocumentation: interchangeUseCaseDocumentation,
      namespace: coreNamespace,
      elements: [
        Object.assign(newInterchangeItem(), {
          metaEdName: association1Name,
          documentation: interchangeItemAssociation1Documentation,
          data: {
            edfiXsd: {},
          },
        }),
      ],
    });

    addMergedInterchangeToRepository(metaEd, coreMergedInterchange);

    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should create additional extension interchange', () => {
    const expectedExtensionInterchangeName = `${projectExtension}-${interchangeName}`;
    const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
    const mergedInterchange: any = edFiXsdEntityRepository.mergedInterchange.get(expectedExtensionInterchangeName);

    expect(mergedInterchange).toBeDefined();
    expect(mergedInterchange.namespace.isExtension).toBe(true);
    expect(mergedInterchange.metaEdName).toBe(interchangeName);
    expect(mergedInterchange.documentation).toBe(interchangeDocumentation);
    expect(mergedInterchange.extendedDocumentation).toBe(interchangeExtendedDocumentation);
    expect(mergedInterchange.useCaseDocumentation).toBe(interchangeUseCaseDocumentation);
    expect(mergedInterchange.elements.length).toBe(1);

    expect(mergedInterchange.elements[0].metaEdName).toBe(association1Name);
    expect(mergedInterchange.elements[0].documentation).toBe(interchangeItemAssociation1Documentation);
    expect(mergedInterchange.elements[0].referencedEntity).toBe(associationExtension);
    expect(mergedInterchange.elements[0].namespace.namespaceName).toBe(extensionNamespaceName);
  });
});
