// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';

export class PercentPropertySourceMap extends SimplePropertySourceMap {}

export class PercentProperty extends SimpleProperty {
  sourceMap: PercentPropertySourceMap;
}

export function percentPropertyFactory(): PercentProperty {
  return Object.assign(new PercentProperty(), defaultSimpleProperty(), {
    type: 'percent',
    sourceMap: new PercentPropertySourceMap(),
  });
}
