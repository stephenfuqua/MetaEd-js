import { ApiFullName } from './ApiFullName';
import { ApiProperty } from './ApiProperty';

export type AssociationDefinitionCardinality =
  | 'OneToOne'
  | 'OneToOneInheritance'
  | 'OneToOneExtension'
  | 'OneToOneOrMore'
  | 'OneToZeroOrMore'
  | 'Unknown';

export interface AssociationDefinition {
  fullName: ApiFullName;
  cardinality: AssociationDefinitionCardinality;
  primaryEntityFullName: ApiFullName;
  primaryEntityProperties: ApiProperty[];
  secondaryEntityFullName: ApiFullName;
  secondaryEntityProperties: ApiProperty[];
  isIdentifying: boolean;
  isRequired: boolean;
}
