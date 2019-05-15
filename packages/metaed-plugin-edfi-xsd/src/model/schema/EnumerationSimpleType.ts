import deepFreeze from 'deep-freeze';
import { SimpleType, newSimpleType } from './SimpleType';
import { EnumerationToken } from './EnumerationToken';

export interface EnumerationSimpleType extends SimpleType {
  enumerationTokens: EnumerationToken[];
  hasRestrictions: () => boolean;
}

export function newEnumerationSimpleType(): EnumerationSimpleType {
  return Object.assign({}, newSimpleType(), {
    enumerationTokens: [],
    hasRestrictions() {
      return this.enumerationTokens.length > 0;
    },
  });
}

export const NoEnumerationSimpleType: SimpleType = deepFreeze(
  Object.assign(newSimpleType(), {
    name: 'NoEnumerationSimpleType',
  }),
);
