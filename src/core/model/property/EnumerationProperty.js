// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { EntityPropertySourceMap } from './EntityProperty';

export class EnumerationPropertySourceMap extends ReferentialPropertySourceMap {}

export class EnumerationProperty extends ReferentialProperty {
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | EnumerationPropertySourceMap;
}

export function enumerationPropertyFactory(): EnumerationProperty {
  return Object.assign(new EnumerationProperty(), defaultReferentialProperty(), {
    type: 'enumeration',
    sourceMap: new EnumerationPropertySourceMap(),
  });
}
