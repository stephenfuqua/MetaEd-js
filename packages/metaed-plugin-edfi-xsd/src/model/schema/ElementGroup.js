// @flow
import type { ComplexTypeItem } from './ComplexTypeItem';

export type ElementGroup = ComplexTypeItem & {
  isChoice: boolean,
  items: Array<ComplexTypeItem>,
}

export function newElementGroup(): ElementGroup {
  return {
    isChoice: false,
    items: [],
    minOccurs: '',
    maxOccurs: '',
    maxOccursIsUnbounded: false,
  };
}
