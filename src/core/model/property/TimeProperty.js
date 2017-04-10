// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';

export class TimePropertySourceMap extends SimplePropertySourceMap {}

export class TimeProperty extends SimpleProperty {
  sourceMap: TimePropertySourceMap;
}

export function timePropertyFactory(): TimeProperty {
  return Object.assign(new TimeProperty(), defaultSimpleProperty(), {
    type: 'time',
    sourceMap: new TimePropertySourceMap(),
  });
}
