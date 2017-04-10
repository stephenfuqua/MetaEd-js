// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';

export class DurationPropertySourceMap extends SimplePropertySourceMap {}

export class DurationProperty extends SimpleProperty {
  sourceMap: DurationPropertySourceMap;
}

export function durationPropertyFactory(): DurationProperty {
  return Object.assign(new DurationProperty(), defaultSimpleProperty(), {
    type: 'duration',
    sourceMap: new DurationPropertySourceMap(),
  });
}
