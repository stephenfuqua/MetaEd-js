// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, newReferentialProperty } from './ReferentialProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class SchoolYearEnumerationPropertySourceMap extends ReferentialPropertySourceMap {}

export class SchoolYearEnumerationProperty extends ReferentialProperty {
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | SchoolYearEnumerationPropertySourceMap;
}

export function newSchoolYearEnumerationProperty(): SchoolYearEnumerationProperty {
  return Object.assign(new SchoolYearEnumerationProperty(), newReferentialProperty(), {
    type: 'schoolYearEnumeration',
    typeHumanizedName: 'School Year Enumeration Property',
    sourceMap: new SchoolYearEnumerationPropertySourceMap(),
  });
}

export const asSchoolYearEnumerationProperty = (x: EntityProperty): SchoolYearEnumerationProperty => ((x: any): SchoolYearEnumerationProperty);

