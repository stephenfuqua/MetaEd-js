export type ElementDefinition = {
  elementGroup: string;
  entityPath: Array<string>;
  element: string;
  definition: string;
  dataType: string;
  fieldLength: string;
  url: string;
  technicalName: string;
  isRequired: boolean;
};

export const newElementDefinition = (): ElementDefinition => ({
  elementGroup: '',
  entityPath: [],
  element: '',
  definition: '',
  dataType: '',
  fieldLength: '',
  url: '',
  technicalName: '',
  isRequired: false,
});
