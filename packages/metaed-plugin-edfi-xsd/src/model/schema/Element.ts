import { Annotation } from './Annotation';
import { ComplexTypeItem } from './ComplexTypeItem';
import { newComplexTypeItem } from './ComplexTypeItem';
import { newAnnotation } from './Annotation';

export interface Element extends ComplexTypeItem {
  name: string;
  type: string;
  annotation: Annotation;
}

export function newElement(): Element {
  return Object.assign({}, newComplexTypeItem(), {
    name: '',
    type: '',
    annotation: newAnnotation(),
  });
}
