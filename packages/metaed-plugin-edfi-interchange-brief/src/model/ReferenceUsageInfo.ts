export type ReferenceUsageInfo = {
  name: string;
  rootEntityName: string;
  isOptional: boolean;
  description: string;
};

export function newReferenceUsageInfo() {
  return {
    name: '',
    rootEntityName: '',
    isOptional: false,
    description: '',
  };
}

export function sortByNameThenRootEntityName(a: ReferenceUsageInfo, b: ReferenceUsageInfo) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  if (a.rootEntityName < b.rootEntityName) return -1;
  if (a.rootEntityName > b.rootEntityName) return 1;
  return 0;
}
