// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult, Interchange, InterchangeExtension } from 'metaed-core';
import type { MergedInterchange } from '../model/MergedInterchange';
import { newMergedInterchange, addMergedInterchangeToRepository } from '../model/MergedInterchange';
import type { ModelBaseEdfiXsd } from '../model/ModelBase';

const enhancerName: string = 'MergedInterchangeEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  // Build merged interchanges for all the interchanges, in any namespace
  metaEd.entity.interchange.forEach((interchange: Interchange) => {
    const mergedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      metaEdName: interchange.metaEdName,
      repositoryId: interchange.metaEdName,
      documentation: interchange.documentation,
      extendedDocumentation: interchange.extendedDocumentation,
      useCaseDocumentation: interchange.useCaseDocumentation,
      namespaceInfo: interchange.namespaceInfo,
      elements: interchange.elements,
      identityTemplates: interchange.identityTemplates,
    });

    addMergedInterchangeToRepository(metaEd, mergedInterchange);
  });

  // Build merged interchanges for all the extensions in the extension namespace
  metaEd.entity.interchangeExtension.forEach((interchangeExtension: InterchangeExtension) => {
    const interchange = interchangeExtension.baseEntity;
    if (!interchange) return;
    const mergedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      metaEdName: interchange.metaEdName,
      repositoryId: ((interchangeExtension.data.edfiXsd: any): ModelBaseEdfiXsd).xsd_MetaEdNameWithExtension(),
      documentation: interchange.documentation,
      extendedDocumentation: interchange.extendedDocumentation,
      useCaseDocumentation: interchange.useCaseDocumentation,
      namespaceInfo: interchangeExtension.namespaceInfo,
    });
    Object.assign(mergedInterchange, {
      elements: R.union(
        interchange.elements.filter(e => mergedInterchange.elements.every(mie => mie.metaEdName !== e.metaEdName)),
        interchangeExtension.elements,

      ),
      identityTemplates: R.union(
        interchangeExtension.identityTemplates,
        interchange.identityTemplates.filter(e => mergedInterchange.identityTemplates.every(mie => mie.metaEdName !== e.metaEdName)),
      ),
    });

    addMergedInterchangeToRepository(metaEd, mergedInterchange);
  });

  return {
    enhancerName,
    success: true,
  };
}
