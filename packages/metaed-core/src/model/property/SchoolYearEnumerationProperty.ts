import { ReferentialProperty, ReferentialPropertySourceMap } from './ReferentialProperty';
import { newReferentialProperty, newReferentialPropertySourceMap } from './ReferentialProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type SchoolYearEnumerationPropertySourceMap = ReferentialPropertySourceMap;

/**
 *
 */
export function newSchoolYearEnumerationPropertySourceMap(): SchoolYearEnumerationPropertySourceMap {
  return {
    ...newReferentialPropertySourceMap(),
  };
}

export interface SchoolYearEnumerationProperty extends ReferentialProperty {
  sourceMap: SchoolYearEnumerationPropertySourceMap;
}

/**
 *
 */
export function newSchoolYearEnumerationProperty(): SchoolYearEnumerationProperty {
  return {
    ...newReferentialProperty(),
    type: 'schoolYearEnumeration',
    typeHumanizedName: 'School Year Enumeration Property',
    sourceMap: newSchoolYearEnumerationPropertySourceMap(),
  };
}

/**
 *
 */
export const asSchoolYearEnumerationProperty = (x: EntityProperty): SchoolYearEnumerationProperty =>
  x as SchoolYearEnumerationProperty;
