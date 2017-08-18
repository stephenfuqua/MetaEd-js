// @flow
import type { Annotation } from './Annotation';
import { newAnnotation } from './Annotation';

export type SimpleType = {
  name: string,
  baseType: string,
  annotation: Annotation,
}

export function newSimpleType(): SimpleType {
  return {
    name: '',
    baseType: '',
    annotation: newAnnotation(),
  };
}
