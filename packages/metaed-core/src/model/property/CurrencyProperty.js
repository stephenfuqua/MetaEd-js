// @flow
import { SimpleProperty, SimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class CurrencyPropertySourceMap extends SimplePropertySourceMap {}

export class CurrencyProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | CurrencyPropertySourceMap;
}

export function newCurrencyProperty(): CurrencyProperty {
  return Object.assign(new CurrencyProperty(), newSimpleProperty(), {
    type: 'currency',
    typeHumanizedName: 'Currency Property',
    sourceMap: new CurrencyPropertySourceMap(),
  });
}

export const asCurrencyProperty = (x: EntityProperty): CurrencyProperty => ((x: any): CurrencyProperty);
