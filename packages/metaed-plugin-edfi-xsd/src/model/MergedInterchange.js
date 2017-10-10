// @flow
import { newNamespaceInfo } from '../../../../packages/metaed-core/index';
import type { NamespaceInfo, Interchange, InterchangeItem, MetaEdEnvironment } from '../../../../packages/metaed-core/index';
import { unionOfInterchangeItems } from '../model/InterchangeItem';
import type { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';

// From structure of Interchange - if core models move to structural typing, consider using Interchange directly
type MergedInterchangeBase = {
  documentation: string,
  metaEdName: string,
  metaEdId: string,
  namespaceInfo: NamespaceInfo,

  elements: Array<InterchangeItem>,
  identityTemplates: Array<InterchangeItem>,
  extendedDocumentation: string,
  useCaseDocumentation: string,
  baseEntityName: string,
  baseEntity: ?Interchange,
}

export type MergedInterchange = {
  ...$Exact<MergedInterchangeBase>,
  repositoryId: string,
  interchangeName: string,
  schemaLocation: string,
  orderedElements: Array<InterchangeItem>,
}

export const combinedElementsAndIdentityTemplatesFor =
(mergedInterchange: MergedInterchange) => unionOfInterchangeItems(mergedInterchange.elements, mergedInterchange.identityTemplates);

export const addMergedInterchangeToRepository = (metaEd: MetaEdEnvironment, mergedInterchange: MergedInterchange) => {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  mergedInterchange.repositoryId = mergedInterchange.namespaceInfo.isExtension ?
    `${mergedInterchange.namespaceInfo.projectExtension}-${mergedInterchange.metaEdName}` :
    mergedInterchange.metaEdName;

  edFiXsdEntityRepository.mergedInterchange.set(mergedInterchange.repositoryId, mergedInterchange);
};

// warning: limitation of extending base model objects in an extension plugin is that the type field is restricted
// to base types - so it will have type as 'interchange'
export function newMergedInterchange(): MergedInterchange {
  return {
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: newNamespaceInfo(),

    elements: [],
    identityTemplates: [],
    extendedDocumentation: '',
    useCaseDocumentation: '',
    baseEntityName: '',
    baseEntity: null,

    repositoryId: '',
    interchangeName: '',
    schemaLocation: '',
    orderedElements: [],
  };
}
