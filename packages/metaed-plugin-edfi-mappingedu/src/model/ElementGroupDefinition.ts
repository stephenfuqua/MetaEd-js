export type ElementGroupDefinition = {
  elementGroup: string;
  definition: string;
};

export const newElementGroupDefinition = (): ElementGroupDefinition => ({
  elementGroup: '',
  definition: '',
});
