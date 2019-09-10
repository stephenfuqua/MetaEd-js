import { SimpleType, newSimpleType } from './SimpleType';

export interface DecimalSimpleType extends SimpleType {
  totalDigits: string;
  decimalPlaces: string;
  minValue: string;
  maxValue: string;
  hasRestrictions: () => boolean;
}

export function newDecimalSimpleType(): DecimalSimpleType {
  return {
    ...newSimpleType(),
    totalDigits: '',
    decimalPlaces: '',
    minValue: '',
    maxValue: '',
    hasRestrictions() {
      return !!this.totalDigits || !!this.decimalPlaces || !!this.minValue || !!this.maxValue;
    },
  };
}
