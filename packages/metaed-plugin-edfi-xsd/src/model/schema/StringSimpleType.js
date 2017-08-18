// @flow
import type { SimpleType } from './SimpleType';
import { newSimpleType } from './SimpleType';

export type StringSimpleType = SimpleType & {
  minLength: string,
  maxLength: string,
  hasRestrictions: () => boolean,
}

export function newStringSimpleType(): StringSimpleType {
  return Object.assign({}, newSimpleType(), {
    minLength: '',
    maxLength: '',
    hasRestrictions: () => !!this.minLength || !!this.maxLength,
  });
}
