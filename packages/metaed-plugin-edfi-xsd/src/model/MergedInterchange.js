// @flow
import { String as sugar } from 'sugar';
import { newNamespace } from 'metaed-core';
import type { Namespace, Interchange, InterchangeItem, MetaEdEnvironment } from 'metaed-core';
import { unionOfInterchangeItems } from '../model/InterchangeItem';
import type { EdFiXsdEntityRepository } from '../model/EdFiXsdEntityRepository';

// From structure of Interchange - if core models move to structural typing, consider using Interchange directly
type MergedInterchangeBase = {
  data: any,
  documentation: string,
  metaEdName: string,
  metaEdId: string,
  namespace: Namespace,

  elements: Array<InterchangeItem>,
  identityTemplates: Array<InterchangeItem>,
  extendedDocumentation: string,
  useCaseDocumentation: string,
  baseEntityName: string,
  baseEntity: ?Interchange,
};

export type MergedInterchange = {
  ...$Exact<MergedInterchangeBase>,
  repositoryId: string,
  interchangeName: string,
  schemaLocation: string,
  orderedElements: Array<InterchangeItem>,
  humanizedName: string,
};

export const addHumanizedNameFor = (mergedInterchange: MergedInterchange) =>
  mergedInterchange.metaEdName ? sugar.titleize(mergedInterchange.metaEdName) : '';

export const combinedElementsAndIdentityTemplatesFor = (mergedInterchange: MergedInterchange) =>
  unionOfInterchangeItems(mergedInterchange.elements, mergedInterchange.identityTemplates);

export const addMergedInterchangeToRepository = (metaEd: MetaEdEnvironment, mergedInterchange: MergedInterchange) => {
  const edFiXsdEntityRepository: EdFiXsdEntityRepository = (metaEd.plugin.get('edfiXsd'): any).entity;
  mergedInterchange.repositoryId = mergedInterchange.namespace.isExtension
    ? `${mergedInterchange.namespace.projectExtension}-${mergedInterchange.metaEdName}`
    : mergedInterchange.metaEdName;
  mergedInterchange.humanizedName = addHumanizedNameFor(mergedInterchange);

  edFiXsdEntityRepository.mergedInterchange.set(mergedInterchange.repositoryId, mergedInterchange);
};

// warning: limitation of extending base model objects in an extension plugin is that the type field is restricted
// to base types - so it will have type as 'interchange'
export function newMergedInterchange(): MergedInterchange {
  return {
    data: {},
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespace: newNamespace(),

    elements: [],
    identityTemplates: [],
    extendedDocumentation: '',
    useCaseDocumentation: '',
    baseEntityName: '',
    baseEntity: null,
    humanizedName: '',
    repositoryId: '',
    interchangeName: '',
    schemaLocation: '',
    orderedElements: [],
  };
}
