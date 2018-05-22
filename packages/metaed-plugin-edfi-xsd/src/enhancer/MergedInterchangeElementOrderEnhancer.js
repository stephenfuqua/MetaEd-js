// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import type { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';
import type { MergedInterchange } from '../model/MergedInterchange';
import { edfiXsdRepositoryForNamespace } from './EnhancerHelper';
import { combinedElementsAndIdentityTemplatesFor } from '../model/MergedInterchange';
import {
  unionOfInterchangeItems,
  differenceOfInterchangeItems,
  differenceOfInterchangeItemsNameOnly,
} from '../model/InterchangeItem';

const enhancerName: string = 'MergedInterchangeElementOrderEnhancer';

function orderExtensionElements(
  coreInterchanges: Array<MergedInterchange>,
  extensionInterchanges: Array<MergedInterchange>,
) {
  extensionInterchanges.forEach(extension => {
    const initialExtensionElements = combinedElementsAndIdentityTemplatesFor(extension);
    const matchingCoreInterchange = R.find(R.eqProps('metaEdName', extension), coreInterchanges);
    if (matchingCoreInterchange) {
      const initialCoreElements = combinedElementsAndIdentityTemplatesFor(matchingCoreInterchange);
      const extensionElementsLessCoreElements = differenceOfInterchangeItemsNameOnly(
        initialExtensionElements,
        initialCoreElements,
      );
      const extensionElementsThatExtendCore = differenceOfInterchangeItems(
        initialExtensionElements,
        extensionElementsLessCoreElements,
      );
      const extensionElementsThatExtendCoreThenOnesThatAreNew = unionOfInterchangeItems(
        extensionElementsThatExtendCore,
        extensionElementsLessCoreElements,
      );
      extension.orderedElements = extensionElementsThatExtendCoreThenOnesThatAreNew;
    } else {
      extension.orderedElements = initialExtensionElements;
    }
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const coreNamespace: Namespace = metaEd.namespace.get('edfi');
  if (coreNamespace == null) return { enhancerName, success: false };
  const coreXsdRepository: ?EdFiXsdEntityRepository = edfiXsdRepositoryForNamespace(metaEd, coreNamespace);
  if (coreXsdRepository == null) return { enhancerName, success: false };

  const coreInterchanges: Array<MergedInterchange> = [...coreXsdRepository.mergedInterchange.values()];
  coreInterchanges.forEach((coreInterchange: MergedInterchange) => {
    coreInterchange.orderedElements = combinedElementsAndIdentityTemplatesFor(coreInterchange);
  });

  metaEd.namespace.forEach((namespace: Namespace) => {
    if (!namespace.isExtension) return;
    const xsdRepository: ?EdFiXsdEntityRepository = edfiXsdRepositoryForNamespace(metaEd, namespace);
    if (xsdRepository == null) return;

    orderExtensionElements(coreInterchanges, [...xsdRepository.mergedInterchange.values()]);
  });

  return {
    enhancerName,
    success: true,
  };
}
