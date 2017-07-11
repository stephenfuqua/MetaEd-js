// @flow
import { newTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';
import { Enumeration, EnumerationSourceMap } from './Enumeration';

export class MapTypeEnumeration extends Enumeration {}

export function newMapTypeEnumeration(): MapTypeEnumeration {
  return Object.assign(new MapTypeEnumeration(), newTopLevelEntity(), {
    type: 'mapTypeEnumeration',
    typeHumanizedName: 'Map Type Enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}

export const NoMapTypeEnumeration: MapTypeEnumeration = Object.assign(newMapTypeEnumeration(), {
  metaEdName: 'NoMapTypeEnumeration',
});

export const asMapTypeEnumeration = (x: ModelBase): MapTypeEnumeration => ((x: any): MapTypeEnumeration);
