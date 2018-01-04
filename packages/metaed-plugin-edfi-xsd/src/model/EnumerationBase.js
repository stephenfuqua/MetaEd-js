// @flow
import type { MetaEdEnvironment, EnhancerResult, Enumeration, MapTypeEnumeration, SchoolYearEnumeration } from 'metaed-core';
import type { EnumerationSimpleType } from './schema/EnumerationSimpleType';
import { NoEnumerationSimpleType } from './schema/EnumerationSimpleType';

export type EnumerationBaseEdfiXsd = {
  xsd_EnumerationName: string,
  xsd_EnumerationNameWithExtension: string,
  xsd_EnumerationSimpleType: EnumerationSimpleType,
};

export type EnumerationBase = Enumeration | MapTypeEnumeration | SchoolYearEnumeration;

const enhancerName: string = 'EnumerationBaseSetupEnhancer';

export function addEnumerationEdfiXsdTo(enumeration: EnumerationBase) {
  if (enumeration.data.edfiXsd == null) enumeration.data.edfiXsd = {};

  Object.assign(enumeration.data.edfiXsd, {
    xsd_EnumerationName: '',
    xsd_EnumerationNameWithExtension: '',
    xsd_EnumerationSimpleType: NoEnumerationSimpleType,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.enumeration.forEach((enumeration: Enumeration) => {
    addEnumerationEdfiXsdTo(enumeration);
  });

  metaEd.entity.mapTypeEnumeration.forEach((mapTypeEnumeration: MapTypeEnumeration) => {
    addEnumerationEdfiXsdTo(mapTypeEnumeration);
  });

  metaEd.entity.schoolYearEnumeration.forEach((schoolYearEnumeration: SchoolYearEnumeration) => {
    addEnumerationEdfiXsdTo(schoolYearEnumeration);
  });

  return {
    enhancerName,
    success: true,
  };
}
