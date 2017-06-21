// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { EntityPropertySourceMap } from './EntityProperty';

export class SchoolYearEnumerationPropertySourceMap extends ReferentialPropertySourceMap {}

export class SchoolYearEnumerationProperty extends ReferentialProperty {
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | SchoolYearEnumerationPropertySourceMap;
}

export function schoolYearEnumerationPropertyFactory(): SchoolYearEnumerationProperty {
  return Object.assign(new SchoolYearEnumerationProperty(), defaultReferentialProperty(), {
    type: 'schoolYearEnumeration',
    sourceMap: new SchoolYearEnumerationPropertySourceMap(),
  });
}
