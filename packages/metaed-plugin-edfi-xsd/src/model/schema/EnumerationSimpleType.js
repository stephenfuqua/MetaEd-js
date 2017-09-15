// @flow
import type { SimpleType } from './SimpleType';
import { newSimpleType } from './SimpleType';

export type EnumerationSimpleType = {
  ...$Exact<SimpleType>,
  enumerationTokens: Array<string>,
  hasRestrictions: () => boolean,
}

export function newEnumerationSimpleType(): EnumerationSimpleType {
  return Object.assign({}, newSimpleType(), {
    enumerationTokens: [],
    hasRestrictions() { return this.enumerationTokens.length > 0; },
  });
}
