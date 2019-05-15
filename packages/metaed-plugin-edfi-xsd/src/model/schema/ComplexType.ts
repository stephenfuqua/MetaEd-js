import deepFreeze from 'deep-freeze';
import { Annotation, newAnnotation } from './Annotation';
import { Attribute } from './Attribute';
import { ComplexTypeItem } from './ComplexTypeItem';

export interface ComplexType {
  name: string;
  baseType: string;
  annotation: Annotation;
  isAbstract: boolean;
  isRestriction: boolean;
  attributes: Attribute[];
  items: ComplexTypeItem[];

  hasItems: () => boolean;
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
    hasItems() {
      return this.items.length > 0;
    },
  };
}

export const NoComplexType: ComplexType = deepFreeze(
  Object.assign(newComplexType(), {
    name: 'NoComplexType',
  }),
);
