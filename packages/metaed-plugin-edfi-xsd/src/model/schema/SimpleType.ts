import deepFreeze from 'deep-freeze';
import { Annotation } from './Annotation';
import { newAnnotation } from './Annotation';

export interface SimpleType {
  name: string;
  baseType: string;
  annotation: Annotation;
}

export function newSimpleType(): SimpleType {
  return {
    name: '',
    baseType: '',
    annotation: newAnnotation(),
  };
}

export const NoSimpleType: SimpleType = deepFreeze(
  Object.assign(newSimpleType(), {
    name: 'NoSimpleType',
  }),
);
