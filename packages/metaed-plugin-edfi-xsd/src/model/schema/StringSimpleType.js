// @flow
import type { SimpleType } from './SimpleType';
import { newSimpleType } from './SimpleType';

export type StringSimpleType = {
  ...$Exact<SimpleType>,
  minLength: string,
  maxLength: string,
  hasRestrictions: () => boolean,
};

export function newStringSimpleType(): StringSimpleType {
  return Object.assign({}, newSimpleType(), {
    minLength: '',
    maxLength: '',
    hasRestrictions() {
      return !!this.minLength || !!this.maxLength;
    },
  });
}
