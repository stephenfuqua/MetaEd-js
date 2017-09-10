// @flow
import { Interchange, newInterchange } from '../../../../packages/metaed-core/index';
import type { InterchangeItem, MetaEdEnvironment } from '../../../../packages/metaed-core/index';
import { unionOfInterchangeItems } from '../model/InterchangeItem';
import type { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';

export class MergedInterchange extends Interchange {
  repositoryId: string;
  interchangeName: string;
  schemaLocation: string;
  orderedElements: Array<InterchangeItem>;
}

export const combinedElementsAndIdentityTemplatesFor =
(mergedInterchange: MergedInterchange) => unionOfInterchangeItems(mergedInterchange.elements, mergedInterchange.identityTemplates);

export const addMergedInterchangeToRepository = (metaEd: MetaEdEnvironment, mergedInterchange: MergedInterchange) => {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  if (mergedInterchange.namespaceInfo.isExtension) {
    edFiXsdEntityRepository.mergedInterchange.set(`${mergedInterchange.namespaceInfo.projectExtension}-${mergedInterchange.repositoryId}`, mergedInterchange);
  } else {
    edFiXsdEntityRepository.mergedInterchange.set(mergedInterchange.repositoryId, mergedInterchange);
  }
};

// warning: limitation of extending base model objects in an extension plugin is that the type field is restricted
// to base types - so it will have type as 'interchange'
export function newMergedInterchange(): MergedInterchange {
  return Object.assign(new MergedInterchange(), newInterchange(), {
    typeHumanizedName: 'Merged Interchange',
    repositoryId: '',
    interchangeName: '',
    schemaLocation: '',
    orderedElements: [],
  });
}
