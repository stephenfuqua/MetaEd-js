// @flow
import deepFreeze from 'deep-freeze';

export type SchemaDefinition = {
  logicalName: string,
  physicalName: string,
};

export const NoSchemaDefinition: SchemaDefinition = deepFreeze({
  logicalName: '',
  physicalName: '',
});
