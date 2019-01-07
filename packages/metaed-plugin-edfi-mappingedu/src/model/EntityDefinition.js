// @flow
export type EntityDefinition = {
  elementGroup: string,
  entityPath: Array<string>,
  definition: string,
};

export const newEntityDefinition = (): EntityDefinition => ({
  elementGroup: '',
  entityPath: [],
  definition: '',
});
