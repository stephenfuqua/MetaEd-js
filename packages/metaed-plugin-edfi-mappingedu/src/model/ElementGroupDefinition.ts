export interface ElementGroupDefinition {
  elementGroup: string;
  definition: string;
}

export const newElementGroupDefinition = (): ElementGroupDefinition => ({
  elementGroup: '',
  definition: '',
});
