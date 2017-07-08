// @flow
import type { SimpleType } from './SimpleType';
import { newAnnotation } from './Annotation';

export type IntegerSimpleType = SimpleType & {
  minValue: string,
  maxValue: string,
  hasRestrictions: () => boolean,
}

export function newDecimalSimpleType(): IntegerSimpleType {
  return {
    name: '',
    baseType: '',
    annotation: newAnnotation(),
    minValue: '',
    maxValue: '',
    hasRestrictions: () => !!this.minValue || !!this.maxValue,
  };
}
