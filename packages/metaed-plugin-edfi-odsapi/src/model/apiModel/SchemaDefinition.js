// @flow
export type SchemaDefinition = {
  logicalName: string,
  physicalName: string,
};

export const NoSchemaDefinition: SchemaDefinition = {
  logicalName: '',
  physicalName: '',
};
