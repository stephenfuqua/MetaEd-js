// @flow
import type { EntityProperty } from './EntityProperty';

export type PropertyType =
  'unknown' |
  'association' |
  'boolean' |
  'choice' |
  'common' |
  'common extension' |
  'currency' |
  'date' |
  'decimal' |
  'descriptor' |
  'domain entity' |
  'duration' |
  'enumeration' |
  'inline common' |
  'integer' |
  'percent' |
  'school year enumeration' |
  'shared decimal' |
  'shared integer' |
  'shared short' |
  'shared string' |
  'short' |
  'string' |
  'time' |
  'year';

const sharedProperty: Array<string> = ['shared decimal', 'shared integer', 'shared short', 'shared string'];
export const isSharedProperty = (property: EntityProperty): boolean => sharedProperty.includes(property.type);
