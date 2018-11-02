// @flow
import type { EntityProperty } from './EntityProperty';

export type PropertyType =
  | 'unknown'
  | 'association'
  | 'boolean'
  | 'choice'
  | 'common'
  | 'currency'
  | 'date'
  | 'datetime'
  | 'decimal'
  | 'descriptor'
  | 'domainEntity'
  | 'duration'
  | 'enumeration'
  | 'inlineCommon'
  | 'integer'
  | 'percent'
  | 'schoolYearEnumeration'
  | 'sharedDecimal'
  | 'sharedInteger'
  | 'sharedShort'
  | 'sharedString'
  | 'short'
  | 'string'
  | 'time'
  | 'year';

const sharedProperty: Array<PropertyType> = ['sharedDecimal', 'sharedInteger', 'sharedShort', 'sharedString'];
export const isSharedProperty = (property: EntityProperty): boolean => sharedProperty.includes(property.type);

const referentialProperty: Array<PropertyType> = [
  'association',
  'choice',
  'common',
  'descriptor',
  'domainEntity',
  'enumeration',
  'inlineCommon',
  'schoolYearEnumeration',
];
export const isReferentialProperty = (property: EntityProperty): boolean => referentialProperty.includes(property.type);

export const allPropertyTypes: Array<PropertyType> = [
  'association',
  'boolean',
  'choice',
  'common',
  'currency',
  'date',
  'datetime',
  'decimal',
  'descriptor',
  'domainEntity',
  'duration',
  'enumeration',
  'inlineCommon',
  'integer',
  'percent',
  'schoolYearEnumeration',
  'sharedDecimal',
  'sharedInteger',
  'sharedShort',
  'sharedString',
  'short',
  'string',
  'time',
  'year',
];
