// @flow
import { String as sugar } from 'sugar';

export type SchemaDefinition = {
  logicalName: string,
  physicalName: string,
};

export const NoSchemaDefinition: SchemaDefinition = {
  logicalName: '',
  physicalName: '',
};

export function logicalNameFor(namespace: string): string {
  if (namespace === 'edfi') return 'Ed-Fi';
  if (namespace === 'gb') return 'GrandBend';
  return sugar.titleize(namespace);
}
