import { ApiProperty } from './ApiProperty';
import { EntityIdentifier } from './EntityIdentifier';
import { PhysicalNames } from './PhysicalNames';

export interface EntityDefinition {
  schema: string;
  name: string;
  tableNames?: PhysicalNames;
  locallyDefinedProperties: ApiProperty[];
  identifiers: EntityIdentifier[];
  isAbstract: boolean;
  description: string;
  isDeprecated?: boolean;
  deprecationReasons?: string[];
}

export function newEntityDefinition(): EntityDefinition {
  return {
    schema: '',
    name: '',
    locallyDefinedProperties: [],
    identifiers: [],
    isAbstract: false,
    description: '',
  };
}
