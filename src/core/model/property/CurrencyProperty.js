// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class CurrencyPropertySourceMap extends SimplePropertySourceMap {}

export class CurrencyProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | CurrencyPropertySourceMap;
}

export function currencyPropertyFactory(): CurrencyProperty {
  return Object.assign(new CurrencyProperty(), defaultSimpleProperty(), {
    type: 'currency',
    sourceMap: new CurrencyPropertySourceMap(),
  });
}

export const asCurrencyProperty = (x: EntityProperty): CurrencyProperty => ((x: any): CurrencyProperty);
