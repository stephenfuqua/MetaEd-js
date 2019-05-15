export interface ComplexTypeItem {
  minOccurs: string;
  maxOccurs: string;
  maxOccursIsUnbounded: boolean;
}

export function newComplexTypeItem(): ComplexTypeItem {
  return {
    minOccurs: '',
    maxOccurs: '',
    maxOccursIsUnbounded: false,
  };
}
