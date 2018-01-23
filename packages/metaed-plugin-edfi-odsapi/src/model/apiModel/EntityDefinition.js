// @flow
import type { ApiProperty } from './ApiProperty';
import type { EntityIdentifier } from './EntityIdentifier';

export type EntityDefinition = {
  schema: string,
  name: string,
  locallyDefinedProperties: Array<ApiProperty>,
  identifiers: Array<EntityIdentifier>,
  isAbstract: boolean,
  description: string,
};
