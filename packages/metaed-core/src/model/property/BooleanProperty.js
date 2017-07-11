// @flow
import { SimpleProperty, SimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class BooleanPropertySourceMap extends SimplePropertySourceMap {}

export class BooleanProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | BooleanPropertySourceMap;
}

export function newBooleanProperty(): BooleanProperty {
  return Object.assign(new BooleanProperty(), newSimpleProperty(), {
    type: 'boolean',
    typeHumanizedName: 'Boolean Property',
    sourceMap: new BooleanPropertySourceMap(),
  });
}

export const asBooleanProperty = (x: EntityProperty): BooleanProperty => ((x: any): BooleanProperty);
