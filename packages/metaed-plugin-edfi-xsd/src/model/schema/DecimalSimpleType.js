// @flow
import type { SimpleType } from './SimpleType';
import { newSimpleType } from './SimpleType';

export type DecimalSimpleType = SimpleType & {
  totalDigits: string,
  decimalPlaces: string,
  minValue: string,
  maxValue: string,
  hasRestrictions: () => boolean,
}

export function newDecimalSimpleType(): DecimalSimpleType {
  return Object.assign({}, newSimpleType(), {
    totalDigits: '',
    decimalPlaces: '',
    minValue: '',
    maxValue: '',
    hasRestrictions: () => !!this.totalDigits || !!this.decimalPlaces || !!this.minValue || !!this.maxValue,
  });
}
