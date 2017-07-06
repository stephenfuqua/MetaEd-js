// @flow
import { SimpleProperty, SimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class TimePropertySourceMap extends SimplePropertySourceMap {}

export class TimeProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | TimePropertySourceMap;
}

export function newTimeProperty(): TimeProperty {
  return Object.assign(new TimeProperty(), newSimpleProperty(), {
    type: 'time',
    sourceMap: new TimePropertySourceMap(),
  });
}

export const asTimeProperty = (x: EntityProperty): TimeProperty => ((x: any): TimeProperty);
