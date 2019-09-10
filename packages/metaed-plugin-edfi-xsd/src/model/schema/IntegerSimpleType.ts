import { SimpleType, newSimpleType } from './SimpleType';

export interface IntegerSimpleType extends SimpleType {
  minValue: string;
  maxValue: string;
  hasRestrictions: () => boolean;
}

export function newIntegerSimpleType(): IntegerSimpleType {
  return {
    ...newSimpleType(),
    minValue: '',
    maxValue: '',
    hasRestrictions() {
      return !!this.minValue || !!this.maxValue;
    },
  };
}
