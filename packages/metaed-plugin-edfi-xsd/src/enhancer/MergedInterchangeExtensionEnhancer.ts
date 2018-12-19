import R from 'ramda';
import { getEntitiesOfTypeForNamespaces, newInterchangeItem } from 'metaed-core';
import { MetaEdEnvironment, EnhancerResult, ModelBase, Namespace } from 'metaed-core';
import { newMergedInterchange, addMergedInterchangeToRepository } from '../model/MergedInterchange';
import { addInterchangeItemEdfiXsdTo } from '../model/InterchangeItem';
import { edfiXsdRepositoryForNamespace } from './EnhancerHelper';
import { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';
import { MergedInterchange } from '../model/MergedInterchange';

const enhancerName = 'MergedInterchangeExtensionEnhancer';

function allMergedInterchanges(metaEd: MetaEdEnvironment, namespace: Namespace): Array<MergedInterchange> {
  const result: Array<MergedInterchange> = [];
  const namespaces: Array<Namespace> = [namespace, ...namespace.dependencies];
  namespaces.forEach((n: Namespace) => {
    const xsdRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(metaEd, n);
    if (xsdRepository == null) return;
    result.push(...xsdRepository.mergedInterchange.values());
  });
  return result;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  Array.from(metaEd.namespace.values())
    .filter(n => n.isExtension)
    .forEach((extensionNamespace: Namespace) => {
      const extensionEntities: Array<ModelBase> = getEntitiesOfTypeForNamespaces(
        [extensionNamespace],
        'associationExtension',
        'domainEntityExtension',
      );

      const extensionEdfiXsdEntityRepository: EdFiXsdEntityRepository | null = edfiXsdRepositoryForNamespace(
        metaEd,
        extensionNamespace,
      );
      if (extensionEdfiXsdEntityRepository == null) return;
      const extensionInterchanges: Array<MergedInterchange> = Array.from(
        extensionEdfiXsdEntityRepository.mergedInterchange.values(),
      );

      // Need to extend any interchange that contains an entity that has an extension in the current namespace
      const interchangesToExtend: Array<MergedInterchange> = allMergedInterchanges(metaEd, extensionNamespace).filter(
        (mi: MergedInterchange) => mi.elements.some(e => extensionEntities.some(ee => ee.metaEdName === e.metaEdName)),
      );

      interchangesToExtend.forEach(interchangeToExtend => {
        // Check to see if the interchange has already been extended
        let extensionInterchange: MergedInterchange = R.find(
          ei => ei.metaEdName === interchangeToExtend.metaEdName,
          extensionInterchanges,
        );
        if (!extensionInterchange) {
          extensionInterchange = Object.assign(newMergedInterchange(), {
            metaEdName: interchangeToExtend.metaEdName,
            repositoryId: `${extensionNamespace.projectExtension}-${interchangeToExtend.metaEdName}`,
            interchangeName: interchangeToExtend.metaEdName,
            documentation: interchangeToExtend.documentation,
            extendedDocumentation: interchangeToExtend.extendedDocumentation,
            useCaseDocumentation: interchangeToExtend.useCaseDocumentation,
            namespace: extensionNamespace,
          });

          interchangeToExtend.elements.forEach(element => {
            const interchangeItem = Object.assign(newInterchangeItem(), {
              metaEdName: element.metaEdName,
              namespace: element.namespace,
              referencedEntity: element.referencedEntity,
              documentation: element.documentation,
            });
            addInterchangeItemEdfiXsdTo(interchangeItem);
            extensionInterchange.elements.push(interchangeItem);
          });
          addMergedInterchangeToRepository(metaEd, extensionInterchange);
        }

        const elementsToExtend = interchangeToExtend.elements
          .map(e => ({
            element: e,
            extensionElement: R.find(ee => ee.metaEdName === e.metaEdName, extensionEntities),
          }))
          .filter(elementPair => elementPair.extensionElement);

        extensionInterchange.elements = extensionInterchange.elements.map(e => {
          const elementToExtend = elementsToExtend.find(i => i.element.metaEdName === e.metaEdName);
          if (elementToExtend) {
            const interchangeItem = Object.assign(newInterchangeItem(), {
              metaEdName: elementToExtend.element.metaEdName,
              namespace: extensionNamespace,
              referencedEntity: elementToExtend.extensionElement,
              documentation: elementToExtend.element.documentation,
            });
            addInterchangeItemEdfiXsdTo(interchangeItem);
            return interchangeItem;
          }
          // otherwise leave it alone.
          return e;
        });
      });
    });

  return {
    enhancerName,
    success: true,
  };
}
