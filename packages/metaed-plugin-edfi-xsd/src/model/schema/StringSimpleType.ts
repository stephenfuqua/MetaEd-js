import deepFreeze from 'deep-freeze';
import { SimpleType, newSimpleType } from './SimpleType';

export interface StringSimpleType extends SimpleType {
  minLength: string;
  maxLength: string;
  hasRestrictions: () => boolean;
}

export function newStringSimpleType(): StringSimpleType {
  return {
    ...newSimpleType(),
    minLength: '',
    maxLength: '',
    hasRestrictions() {
      return !!this.minLength || !!this.maxLength;
    },
  };
}

export const NoStringSimpleType: StringSimpleType = deepFreeze({ ...newStringSimpleType(), name: 'NoStringSimpleType' });
