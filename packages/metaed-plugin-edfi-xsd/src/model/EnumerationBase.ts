import {
  MetaEdEnvironment,
  EnhancerResult,
  Enumeration,
  MapTypeEnumeration,
  SchoolYearEnumeration,
  getAllEntitiesOfType,
} from 'metaed-core';
import { EnumerationSimpleType, NoEnumerationSimpleType } from './schema/EnumerationSimpleType';

export type EnumerationBaseEdfiXsd = {
  xsdEnumerationName: string;
  xsdEnumerationNameWithExtension: string;
  xsdEnumerationSimpleType: EnumerationSimpleType;
};

export type EnumerationBase = Enumeration | MapTypeEnumeration | SchoolYearEnumeration;

const enhancerName = 'EnumerationBaseSetupEnhancer';

export function addEnumerationEdfiXsdTo(enumeration: EnumerationBase) {
  if (enumeration.data.edfiXsd == null) enumeration.data.edfiXsd = {};

  Object.assign(enumeration.data.edfiXsd, {
    xsdEnumerationName: '',
    xsdEnumerationNameWithExtension: '',
    xsdEnumerationSimpleType: NoEnumerationSimpleType,
  });
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'enumeration') as Array<Enumeration>).forEach((enumeration: Enumeration) => {
    addEnumerationEdfiXsdTo(enumeration);
  });

  (getAllEntitiesOfType(metaEd, 'mapTypeEnumeration') as Array<MapTypeEnumeration>).forEach(
    (mapTypeEnumeration: MapTypeEnumeration) => {
      addEnumerationEdfiXsdTo(mapTypeEnumeration);
    },
  );

  (getAllEntitiesOfType(metaEd, 'schoolYearEnumeration') as Array<SchoolYearEnumeration>).forEach(
    (schoolYearEnumeration: SchoolYearEnumeration) => {
      addEnumerationEdfiXsdTo(schoolYearEnumeration);
    },
  );

  return {
    enhancerName,
    success: true,
  };
}
