// @flow
import { defaultTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';
import { Enumeration, EnumerationSourceMap } from './Enumeration';

export class MapTypeEnumeration extends Enumeration {}

export function mapTypeEnumerationFactory(): MapTypeEnumeration {
  return Object.assign(new MapTypeEnumeration(), defaultTopLevelEntity(), {
    type: 'mapTypeEnumeration',
    typeHumanizedName: 'Enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}

export const NoMapTypeEnumeration: MapTypeEnumeration = Object.assign(mapTypeEnumerationFactory(), {
  metaEdName: 'NoMapTypeEnumeration',
});

export const asMapTypeEnumeration = (x: ModelBase): MapTypeEnumeration => ((x: any): MapTypeEnumeration);
