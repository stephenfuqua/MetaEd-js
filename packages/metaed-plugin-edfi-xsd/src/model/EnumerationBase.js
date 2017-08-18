// @flow
import type { MetaEdEnvironment, EnhancerResult, Enumeration } from '../../../../packages/metaed-core/index';
import type { EnumerationSimpleType } from './schema/EnumerationSimpleType';
import { newEnumerationSimpleType } from './schema/EnumerationSimpleType';
import { MapTypeEnumeration } from '../../../metaed-core/src/model/MapTypeEnumeration';
import { SchoolYearEnumeration } from '../../../metaed-core/src/model/SchoolYearEnumeration';

export type EnumerationBaseEdfiXsd = {
  xsd_EnumerationName: string;
  xsd_EnumerationNameWithExtension: string;
  xsd_EnumerationSimpleType: EnumerationSimpleType;
};

const enhancerName: string = 'EnumerationBaseSetupEnhancer';

export function addEnumerationEdfiXsdTo(enumeration: Enumeration | MapTypeEnumeration | SchoolYearEnumeration) {
  Object.assign(enumeration.data.edfiXsd, {
    xsd_EnumerationName: '',
    xsd_EnumerationNameWithExtension: '',
    xsd_EnumerationSimpleType: newEnumerationSimpleType(),
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
