// @flow
import deepFreeze from 'deep-freeze';
import { newEnumeration } from './Enumeration';
import type { ModelBase } from './ModelBase';
import type { Enumeration } from './Enumeration';

export type MapTypeEnumeration = Enumeration;

export function newMapTypeEnumeration(): MapTypeEnumeration {
  return {
    ...newEnumeration(),
    type: 'mapTypeEnumeration',
    typeHumanizedName: 'Map Type Enumeration',
  };
}

export const NoMapTypeEnumeration: MapTypeEnumeration = deepFreeze({
  ...newMapTypeEnumeration(),
  metaEdName: 'NoMapTypeEnumeration',
});

export const asMapTypeEnumeration = (x: ModelBase): MapTypeEnumeration => ((x: any): MapTypeEnumeration);
