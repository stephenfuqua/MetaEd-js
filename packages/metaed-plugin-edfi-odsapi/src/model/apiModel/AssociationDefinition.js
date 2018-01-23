// @flow
import type { ApiFullName } from './ApiFullName';
import type { ApiProperty } from './ApiProperty';

export type AssociationDefinition = {
  fullName: ApiFullName,
  cardinality: 'OneToOne' | 'OneToOneInheritance' | 'OneToOneExtension' | 'OneToOneOrMore' | 'OneToZeroOrMore',
  primaryEntityFullName: ApiFullName,
  primaryEntityProperties: Array<ApiProperty>,
  secondaryEntityFullName: ApiFullName,
  secondaryEntityProperties: Array<ApiProperty>,
  isIdentifying: boolean,
  isRequired: boolean,
};
