// @flow
import type { Annotation } from './Annotation';
import type { Attribute } from './Attribute';
import type { ComplexTypeItem } from './ComplexTypeItem';
import { newAnnotation } from './Annotation';

export type ComplexType = {
  name: string,
  baseType: string,
  annotation: Annotation,
  isAbstract: boolean,
  isRestriction: boolean,
  attributes: Array<Attribute>,
  items: Array<ComplexTypeItem>,

  hasItems: () => boolean,
}

export function newComplexType(): ComplexType {
  return {
    name: '',
    baseType: '',
    annotation: newAnnotation(),
    isAbstract: false,
    isRestriction: false,
    attributes: [],
    items: [],

    hasItems: () => this.items.length > 0,
  };
}
