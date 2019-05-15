export interface EntityDefinition {
  elementGroup: string;
  entityPath: string[];
  definition: string;
}

export const newEntityDefinition = (): EntityDefinition => ({
  elementGroup: '',
  entityPath: [],
  definition: '',
});
