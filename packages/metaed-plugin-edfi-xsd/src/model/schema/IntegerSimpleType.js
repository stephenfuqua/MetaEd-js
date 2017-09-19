// @flow
import type { SimpleType } from './SimpleType';
import { newSimpleType } from './SimpleType';

export type IntegerSimpleType = {
  ...$Exact<SimpleType>,
  minValue: string,
  maxValue: string,
  hasRestrictions: () => boolean,
}

export function newIntegerSimpleType(): IntegerSimpleType {
  return Object.assign({}, newSimpleType(), {
    minValue: '',
    maxValue: '',
    hasRestrictions() { return !!this.minValue || !!this.maxValue; },
  });
}
