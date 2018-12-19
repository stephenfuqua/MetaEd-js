import { SimpleProperty, SimplePropertySourceMap } from './SimpleProperty';
import { newSimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type CurrencyPropertySourceMap = SimplePropertySourceMap;

/**
 *
 */
export function newCurrencyPropertySourceMap(): CurrencyPropertySourceMap {
  return newSimplePropertySourceMap();
}

export interface CurrencyProperty extends SimpleProperty {
  sourceMap: CurrencyPropertySourceMap;
}

/**
 *
 */
export function newCurrencyProperty(): CurrencyProperty {
  return {
    ...newSimpleProperty(),
    type: 'currency',
    typeHumanizedName: 'Currency Property',
    sourceMap: newCurrencyPropertySourceMap(),
  };
}

/**
 *
 */
export const asCurrencyProperty = (x: EntityProperty): CurrencyProperty => x as CurrencyProperty;
