// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult } from '../../../../packages/metaed-core/index';
import type { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';
import type { MergedInterchange } from '../model/MergedInterchange';

const enhancerName: string = 'MergedInterchangeElementOrderEnhancer';

const equalXsdName = R.eqBy(R.path(['data', 'edfiXsd', 'xsd_Name']));
const equalXsdType = R.eqBy(R.path(['data', 'edfiXsd', 'xsd_Type']));
const equalXsdNameAndType = R.both(equalXsdName, equalXsdType);
const unionOf = R.unionWith(equalXsdNameAndType);
const differenceOf = R.differenceWith(equalXsdNameAndType);

const combinedElementsAndIdentityTemplatesFor = (mergedInterchange: MergedInterchange) => unionOf(mergedInterchange.elements, mergedInterchange.identityTemplates);

function addElementsInOrder(coreInterchanges: Array<MergedInterchange>, extensionInterchanges: Array<MergedInterchange>) {
  coreInterchanges.forEach(core => {
    core.orderedElements = combinedElementsAndIdentityTemplatesFor(core);
  });

  extensionInterchanges.forEach(extension => {
    const initialExtensionElements = combinedElementsAndIdentityTemplatesFor(extension);
    const matchingCoreInterchange = R.find(R.eqProps('metaEdName', extension), coreInterchanges);
    if (matchingCoreInterchange) {
      const initialCoreElements = combinedElementsAndIdentityTemplatesFor(matchingCoreInterchange);
      const extensionElementsLessCoreElements = differenceOf(initialExtensionElements, initialCoreElements);
      const extensionElementsThatExtendCore = differenceOf(initialExtensionElements, extensionElementsLessCoreElements);
      const extensionElementsThatExtendCoreThenOnesThatAreNew = unionOf(extensionElementsThatExtendCore, extensionElementsLessCoreElements);
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

