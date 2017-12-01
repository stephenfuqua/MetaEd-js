// @flow
import type { MergedInterchange } from 'metaed-plugin-edfi-xsd';
import { String as sugar } from 'sugar';

export function addEdfiBriefInterchangeTo(mergedInterchange: MergedInterchange) {
  mergedInterchange.data.EdfiInterchangeBrief = {
    interchangeBriefEntities: [],
    interchangeBriefExtendedReferences: [],
    interchangeBriefDescriptorReferences: [],
    humanizedUppercaseMetaEdName: '',
  };
}

export function toHumanizedUppercaseMetaEdName(metaEdName: string) {
  return sugar.titleize(metaEdName);
}
