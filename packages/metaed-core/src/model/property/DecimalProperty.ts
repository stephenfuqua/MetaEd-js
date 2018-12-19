import { SimpleProperty, SimplePropertySourceMap } from './SimpleProperty';
import { newSimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import { EntityProperty } from './EntityProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';

export interface DecimalPropertySourceMap extends SimplePropertySourceMap {
  minValue: SourceMap;
  maxValue: SourceMap;
  totalDigits: SourceMap;
  decimalPlaces: SourceMap;
}

/**
 *
 */
export function newDecimalPropertySourceMap(): DecimalPropertySourceMap {
  return {
    ...newSimplePropertySourceMap(),
    minValue: NoSourceMap,
    maxValue: NoSourceMap,
    totalDigits: NoSourceMap,
    decimalPlaces: NoSourceMap,
  };
}

export interface DecimalProperty extends SimpleProperty {
  sourceMap: DecimalPropertySourceMap;
  minValue: string | null;
  maxValue: string | null;
  totalDigits: string;
  decimalPlaces: string;
}

/**
 *
 */
export function newDecimalProperty(): DecimalProperty {
  return {
    ...newSimpleProperty(),
    type: 'decimal',
    typeHumanizedName: 'Decimal Property',
    minValue: null,
    maxValue: null,
    totalDigits: '',
    decimalPlaces: '',
    sourceMap: newDecimalPropertySourceMap(),
  };
}

/**
 *
 */
export const asDecimalProperty = (x: EntityProperty): DecimalProperty => x as DecimalProperty;
