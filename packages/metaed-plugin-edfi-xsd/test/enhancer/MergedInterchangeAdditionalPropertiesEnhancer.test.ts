import { newMetaEdEnvironment, newInterchangeItem, newInterchange, newNamespace } from 'metaed-core';
import { MetaEdEnvironment, InterchangeItem, Interchange, Namespace } from 'metaed-core';
import { enhance as initializeTopLevelEntities } from '../../src/model/TopLevelEntity';
import { enhance } from '../../src/enhancer/MergedInterchangeAdditionalPropertiesEnhancer';
import { edfiXsdRepositoryForNamespace } from '../../src/enhancer/EnhancerHelper';
import { newMergedInterchange } from '../../src/model/MergedInterchange';
import { enhance as addModelBaseEdfiXsd } from '../../src/model/ModelBase';
import { addEdFiXsdEntityRepositoryTo } from '../../src/model/EdFiXsdEntityRepository';
import { EdFiXsdEntityRepository } from '../../src/model/EdFiXsdEntityRepository';

describe('when MergedInterchangeSchemaLocationEnhancer enhances MergedInterchange with no extension', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), { namespaceName: 'edfi' });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);
  const interchangeName = 'InterchangeName';
  const elementBaseName = 'InterchangeElement';
  let mergedInterchange;

  beforeAll(() => {
    const element: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementBaseName,
    });

    const interchange: Interchange = Object.assign(newInterchange(), {
      metaEdName: interchangeName,
      namespace,
      elements: [element],
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.interchange.set(interchange.metaEdName, interchange);

    mergedInterchange = Object.assign(newMergedInterchange(), {
      metaEdName: interchangeName,
      repositoryId: interchangeName,
      elements: [element],
    });
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) throw new Error();
    edFiXsdEntityRepository.mergedInterchange.set(mergedInterchange.repositoryId, mergedInterchange);

    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have xsdName assigned', () => {
    expect(mergedInterchange.interchangeName).toBe(`Interchange${interchangeName}`);
  });

  it('should have xsdType value assigned', () => {
    expect(mergedInterchange.schemaLocation).toBe('Ed-Fi-Core.xsd');
  });
});

describe('when MergedInterchangeSchemaLocationEnhancer enhances MergedInterchange with extension', () => {
  const projectExtension = 'EXTENSION';
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespace: Namespace = Object.assign(newNamespace(), {
    namespaceName: 'extension',
    projectExtension,
    isExtension: true,
  });
  metaEd.namespace.set(namespace.namespaceName, namespace);
  addEdFiXsdEntityRepositoryTo(metaEd);
  const interchangeName = 'InterchangeName';
  const elementBaseName = 'InterchangeElement';

  let mergedInterchange;

  beforeAll(() => {
    const element: InterchangeItem = Object.assign(newInterchangeItem(), {
      metaEdName: elementBaseName,
    });

    const interchange: Interchange = Object.assign(newInterchange(), {
      metaEdName: interchangeName,
      namespace,
      elements: [element],
      data: {
        edfiXsd: {},
      },
    });
    namespace.entity.interchange.set(interchange.metaEdName, interchange);

    mergedInterchange = Object.assign(newMergedInterchange(), {
      metaEdName: interchangeName,
      repositoryId: interchangeName,
      namespace,
      elements: [element],
    });
    const edFiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (edFiXsdEntityRepository == null) throw new Error();
    edFiXsdEntityRepository.mergedInterchange.set(mergedInterchange.repositoryId, mergedInterchange);

    initializeTopLevelEntities(metaEd);
    addModelBaseEdfiXsd(metaEd);
    enhance(metaEd);
  });

  it('should have xsdName assigned', () => {
    expect(mergedInterchange.interchangeName).toBe(`Interchange${interchangeName}`);
  });

  it('should have xsdType value assigned with extension', () => {
    expect(mergedInterchange.schemaLocation).toBe(`${projectExtension}-Ed-Fi-Extended-Core.xsd`);
  });
});
