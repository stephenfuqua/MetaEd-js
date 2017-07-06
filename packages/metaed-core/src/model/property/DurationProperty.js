// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class DurationPropertySourceMap extends SimplePropertySourceMap {}

export class DurationProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | DurationPropertySourceMap;
}

export function newDurationProperty(): DurationProperty {
  return Object.assign(new DurationProperty(), defaultSimpleProperty(), {
    type: 'duration',
    sourceMap: new DurationPropertySourceMap(),
  });
}

export const asDurationProperty = (x: EntityProperty): DurationProperty => ((x: any): DurationProperty);
