// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class PercentPropertySourceMap extends SimplePropertySourceMap {}

export class PercentProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | PercentPropertySourceMap;
}

export function newPercentProperty(): PercentProperty {
  return Object.assign(new PercentProperty(), defaultSimpleProperty(), {
    type: 'percent',
    sourceMap: new PercentPropertySourceMap(),
  });
}

export const asPercentProperty = (x: EntityProperty): PercentProperty => ((x: any): PercentProperty);
