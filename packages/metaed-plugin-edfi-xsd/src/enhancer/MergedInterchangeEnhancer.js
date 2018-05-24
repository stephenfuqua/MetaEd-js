// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult, Interchange, InterchangeExtension } from 'metaed-core';
import { getAllEntitiesOfType } from 'metaed-core';
import type { MergedInterchange } from '../model/MergedInterchange';
import { newMergedInterchange, addMergedInterchangeToRepository } from '../model/MergedInterchange';
import type { ModelBaseEdfiXsd } from '../model/ModelBase';

const enhancerName: string = 'MergedInterchangeEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  // Build merged interchanges for all the interchanges, in any namespace
  ((getAllEntitiesOfType(metaEd, 'interchange'): any): Array<Interchange>).forEach((interchange: Interchange) => {
    const mergedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
      metaEdName: interchange.metaEdName,
      repositoryId: interchange.metaEdName,
      documentation: interchange.documentation,
      extendedDocumentation: interchange.extendedDocumentation,
      useCaseDocumentation: interchange.useCaseDocumentation,
      namespace: interchange.namespace,
      elements: interchange.elements,
      identityTemplates: interchange.identityTemplates,
    });

    addMergedInterchangeToRepository(metaEd, mergedInterchange);
  });

  // Build merged interchanges for all the extensions in the extension namespace
  ((getAllEntitiesOfType(metaEd, 'interchangeExtension'): any): Array<InterchangeExtension>).forEach(
    (interchangeExtension: InterchangeExtension) => {
      const interchange = interchangeExtension.baseEntity;
      if (!interchange) return;
      const mergedInterchange: MergedInterchange = Object.assign(newMergedInterchange(), {
        metaEdName: interchange.metaEdName,
        repositoryId: ((interchangeExtension.data.edfiXsd: any): ModelBaseEdfiXsd).xsd_MetaEdNameWithExtension(),
        documentation: interchange.documentation,
        extendedDocumentation: interchange.extendedDocumentation,
        useCaseDocumentation: interchange.useCaseDocumentation,
        namespace: interchangeExtension.namespace,
      });
      Object.assign(mergedInterchange, {
        elements: R.union(
          interchange.elements.filter(e => mergedInterchange.elements.every(mie => mie.metaEdName !== e.metaEdName)),
          interchangeExtension.elements,
        ),
        identityTemplates: R.union(
          interchangeExtension.identityTemplates,
          interchange.identityTemplates.filter(e =>
            mergedInterchange.identityTemplates.every(mie => mie.metaEdName !== e.metaEdName),
          ),
        ),
      });

      addMergedInterchangeToRepository(metaEd, mergedInterchange);
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
