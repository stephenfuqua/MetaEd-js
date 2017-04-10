// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';

export class CurrencyPropertySourceMap extends SimplePropertySourceMap {}

export class CurrencyProperty extends SimpleProperty {
  sourceMap: CurrencyPropertySourceMap;
}

export function currencyPropertyFactory(): CurrencyProperty {
  return Object.assign(new CurrencyProperty(), defaultSimpleProperty(), {
    type: 'currency',
    sourceMap: new CurrencyPropertySourceMap(),
  });
}
