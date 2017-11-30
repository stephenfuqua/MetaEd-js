// @flow
export type ReferencedUsage = {
  name: string,
  rootEntityName: string,
  isOptional: boolean,
  description: string,
}
export function newReferencedUsage() {
  return {
    name: '',
    rootEntityName: '',
    isOptional: false,
    description: '',
  };
}
