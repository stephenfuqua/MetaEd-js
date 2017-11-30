// @flow
import type { MergedInterchange as MergedInterchangeBase } from 'metaed-plugin-edfi-xsd';
import { newMergedInterchange as newMergedInterchangeBase } from 'metaed-plugin-edfi-xsd';
import { newNamespaceInfo } from 'metaed-core';
import { String as sugar } from 'sugar';
import { InterchangeItem } from './InterchangeItem';
import type { ReferencedUsage } from './ReferencedUsage';

export type MergedInterchange = {
  ...$Exact<MergedInterchangeBase>,
  interchangeBriefEntities: Array<InterchangeItem>,
  interchangeBriefExtendedReferences: Array<ReferencedUsage>,
  interchangeBriefDescriptorReferences: Array<ReferencedUsage>,
  humanizedUppercaseMetaEdName: string,
}

export function toHumanizedUppercaseMetaEdName(metaEdName: string) {
  return sugar.titleize(metaEdName);
}
// warning: limitation of extending base model objects in an extension plugin is that the type field is restricted
// to base types - so it will have type as 'interchange'
export function newMergedInterchange(): MergedInterchange {
  return Object.assign({}, newMergedInterchangeBase(), {
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: newNamespaceInfo(),
    humanizedUppercaseMetaEdName: '',

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

    interchangeBriefEntities: [],
    interchangeBriefExtendedReferences: [],
    interchangeBriefDescriptorReferences: [],
  });
}
