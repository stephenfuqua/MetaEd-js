// @flow
import type { Annotation } from './Annotation';
import type { ComplexTypeItem } from './ComplexTypeItem';
import { newComplexTypeItem } from './ComplexTypeItem';
import { newAnnotation } from './Annotation';

export type Element = ComplexTypeItem & {
  name: string,
  type: string,
  annotation: Annotation,
}

export function newElement(): Element {
  return Object.assign({}, newComplexTypeItem(), {
    name: '',
    type: '',
    annotation: newAnnotation(),
  });
}
