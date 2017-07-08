// @flow
import type { SimpleType } from './SimpleType';
import { newAnnotation } from './Annotation';

export type StringSimpleType = SimpleType & {
  minLength: string,
  maxLength: string,
  hasRestrictions: () => boolean,
}

export function newStringSimpleType(): StringSimpleType {
  return {
    name: '',
    baseType: '',
    annotation: newAnnotation(),
    minLength: '',
    maxLength: '',
    hasRestrictions: () => !!this.minLength || !!this.maxLength,
  };
}
