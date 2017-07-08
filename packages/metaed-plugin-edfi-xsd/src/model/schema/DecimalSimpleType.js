// @flow
import type { SimpleType } from './SimpleType';
import { newAnnotation } from './Annotation';

export type DecimalSimpleType = SimpleType & {
  totalDigits: string,
  decimalPlaces: string,
  minValue: string,
  maxValue: string,
  hasRestrictions: () => boolean,
}

export function newDecimalSimpleType(): DecimalSimpleType {
  return {
    name: '',
    baseType: '',
    annotation: newAnnotation(),
    totalDigits: '',
    decimalPlaces: '',
    minValue: '',
    maxValue: '',
    hasRestrictions: () => !!this.totalDigits || !!this.decimalPlaces || !!this.minValue || !!this.maxValue,
  };
}
