// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { SourceMap } from './../SourceMap';
import type { EntityPropertySourceMap } from './EntityProperty';

export class DecimalPropertySourceMap extends SimplePropertySourceMap {
  minValue: ?SourceMap;
  maxValue: ?SourceMap;
  totalDigits: ?SourceMap;
  decimalPlaces: ?SourceMap;
}

export class DecimalProperty extends SimpleProperty {
  minValue: ?string;
  maxValue: ?string;
  totalDigits: string;
  decimalPlaces: string;
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | DecimalPropertySourceMap;
}

export function decimalPropertyFactory(): DecimalProperty {
  return Object.assign(new DecimalProperty(), defaultSimpleProperty(), {
    type: 'decimal',
    minValue: null,
    maxValue: null,
    totalDigits: '',
    decimalPlaces: '',
    sourceMap: new DecimalPropertySourceMap(),
  });
}
