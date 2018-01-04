// @flow
import type { SimpleType } from './SimpleType';
import type { EnumerationToken } from './EnumerationToken';
import { newSimpleType } from './SimpleType';

export type EnumerationSimpleType = {
  ...$Exact<SimpleType>,
  enumerationTokens: Array<EnumerationToken>,
  hasRestrictions: () => boolean,
};

export function newEnumerationSimpleType(): EnumerationSimpleType {
  return Object.assign({}, newSimpleType(), {
    enumerationTokens: [],
    hasRestrictions() {
      return this.enumerationTokens.length > 0;
    },
  });
}

export const NoEnumerationSimpleType: SimpleType = Object.assign(newSimpleType(), {
  name: 'NoEnumerationSimpleType',
});
