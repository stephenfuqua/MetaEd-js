// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, newReferentialProperty } from './ReferentialProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class EnumerationPropertySourceMap extends ReferentialPropertySourceMap {}

export class EnumerationProperty extends ReferentialProperty {
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | EnumerationPropertySourceMap;
}

export function newEnumerationProperty(): EnumerationProperty {
  return Object.assign(new EnumerationProperty(), newReferentialProperty(), {
    type: 'enumeration',
    sourceMap: new EnumerationPropertySourceMap(),
  });
}

export const asEnumerationProperty = (x: EntityProperty): EnumerationProperty => ((x: any): EnumerationProperty);
