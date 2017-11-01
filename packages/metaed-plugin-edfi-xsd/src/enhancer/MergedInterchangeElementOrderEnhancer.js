// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import type { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';
import type { MergedInterchange } from '../model/MergedInterchange';
import { combinedElementsAndIdentityTemplatesFor } from '../model/MergedInterchange';
import { unionOfInterchangeItems, differenceOfInterchangeItems, differenceOfInterchangeItemsNameOnly } from '../model/InterchangeItem';

const enhancerName: string = 'MergedInterchangeElementOrderEnhancer';

function addElementsInOrder(coreInterchanges: Array<MergedInterchange>, extensionInterchanges: Array<MergedInterchange>) {
  coreInterchanges.forEach(core => {
    core.orderedElements = combinedElementsAndIdentityTemplatesFor(core);
  });

  extensionInterchanges.forEach(extension => {
    const initialExtensionElements = combinedElementsAndIdentityTemplatesFor(extension);
    const matchingCoreInterchange = R.find(R.eqProps('metaEdName', extension), coreInterchanges);
    if (matchingCoreInterchange) {
      const initialCoreElements = combinedElementsAndIdentityTemplatesFor(matchingCoreInterchange);
      const extensionElementsLessCoreElements = differenceOfInterchangeItemsNameOnly(initialExtensionElements, initialCoreElements);
      const extensionElementsThatExtendCore = differenceOfInterchangeItems(initialExtensionElements, extensionElementsLessCoreElements);
      const extensionElementsThatExtendCoreThenOnesThatAreNew = unionOfInterchangeItems(extensionElementsThatExtendCore, extensionElementsLessCoreElements);
      extension.orderedElements = extensionElementsThatExtendCoreThenOnesThatAreNew;
    } else {
      extension.orderedElements = initialExtensionElements;
    }
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  const coreInterchanges: Array<MergedInterchange> = [];
  const extensionInterchanges: Array<MergedInterchange> = [];
  Array.from(edFiXsdEntityRepository.mergedInterchange.values()).forEach(mergedInterchange => {
    if (mergedInterchange.namespaceInfo.isExtension) {
      extensionInterchanges.push(mergedInterchange);
    } else {
      coreInterchanges.push(mergedInterchange);
    }
  });

  addElementsInOrder(coreInterchanges, extensionInterchanges);

  return {
    enhancerName,
    success: true,
  };
}
