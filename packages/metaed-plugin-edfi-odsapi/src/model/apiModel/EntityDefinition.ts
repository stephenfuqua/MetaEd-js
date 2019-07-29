import { ApiProperty } from './ApiProperty';
import { EntityIdentifier } from './EntityIdentifier';

export interface EntityDefinition {
  schema: string;
  name: string;
  locallyDefinedProperties: ApiProperty[];
  identifiers: EntityIdentifier[];
  isAbstract: boolean;
  description: string;
  isDeprecated?: boolean;
  deprecationReasons?: string[];
}
