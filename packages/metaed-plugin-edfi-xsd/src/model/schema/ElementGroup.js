// @flow
import type { ComplexTypeItem } from './ComplexTypeItem';
import { newComplexTypeItem } from './ComplexTypeItem';

export type ElementGroup = ComplexTypeItem & {
  isChoice: boolean,
  items: Array<ComplexTypeItem>,
}

export function newElementGroup(): ElementGroup {
  return Object.assign({}, newComplexTypeItem(), {
    isChoice: false,
    items: [],
  });
}
