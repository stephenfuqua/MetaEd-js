import deepFreeze from 'deep-freeze';
import { newEnumeration } from './Enumeration';
import { ModelBase } from './ModelBase';
import { Enumeration } from './Enumeration';

/**
 *
 */
export interface MapTypeEnumeration extends Enumeration {}

/**
 *
 */
export function newMapTypeEnumeration(): MapTypeEnumeration {
  return {
    ...newEnumeration(),
    type: 'mapTypeEnumeration',
    typeHumanizedName: 'Map Type Enumeration',
  };
}

/**
 *
 */
export const NoMapTypeEnumeration: MapTypeEnumeration = deepFreeze({
  ...newMapTypeEnumeration(),
  metaEdName: 'NoMapTypeEnumeration',
});

/**
 *
 */
export const asMapTypeEnumeration = (x: ModelBase): MapTypeEnumeration => x as MapTypeEnumeration;
