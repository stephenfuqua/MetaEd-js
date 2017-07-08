// @flow
import type { SimpleType } from './SimpleType';
import { newAnnotation } from './Annotation';

export type EnumerationSimpleType = SimpleType & {
  enumerationTokens: Array<string>,
  hasRestrictions: () => boolean,
}

export function newEnumerationSimpleType(): EnumerationSimpleType {
  return {
    name: '',
    baseType: '',
    annotation: newAnnotation(),
    enumerationTokens: [],
    hasRestrictions: () => this.enumerationTokens.length > 0,
  };
}
