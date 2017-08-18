// @flow
import type { SimpleType } from './SimpleType';
import { newSimpleType } from './SimpleType';

export type IntegerSimpleType = SimpleType & {
  minValue: string,
  maxValue: string,
  hasRestrictions: () => boolean,
}

export function newDecimalSimpleType(): IntegerSimpleType {
  return Object.assign({}, newSimpleType(), {
    minValue: '',
    maxValue: '',
    hasRestrictions: () => !!this.minValue || !!this.maxValue,
  });
}
