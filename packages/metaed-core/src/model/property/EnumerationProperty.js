// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, defaultReferentialProperty } from './ReferentialProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

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

export const asEnumerationProperty = (x: EntityProperty): EnumerationProperty => ((x: any): EnumerationProperty);
