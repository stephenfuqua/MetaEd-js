// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';

export class SchoolYearEnumerationPropertySourceMap extends ReferentialPropertySourceMap {}

export class SchoolYearEnumerationProperty extends ReferentialProperty {
  sourceMap: SchoolYearEnumerationPropertySourceMap;
}

export function schoolYearEnumerationPropertyFactory(): SchoolYearEnumerationProperty {
  return Object.assign(new SchoolYearEnumerationProperty(), defaultReferentialProperty(), {
    type: 'schoolYearEnumeration',
    sourceMap: new SchoolYearEnumerationPropertySourceMap(),
  });
}
