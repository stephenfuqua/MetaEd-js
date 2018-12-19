import { ComplexTypeItem } from './ComplexTypeItem';
import { newComplexTypeItem } from './ComplexTypeItem';

export interface ElementGroup extends ComplexTypeItem {
  isChoice: boolean;
  items: Array<ComplexTypeItem>;
}

export function newElementGroup(): ElementGroup {
  return Object.assign({}, newComplexTypeItem(), {
    isChoice: false,
    items: [],
  });
}
