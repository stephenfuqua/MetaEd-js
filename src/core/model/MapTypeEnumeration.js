// @flow
import { defaultTopLevelEntity } from './TopLevelEntity';
import { Enumeration, EnumerationSourceMap } from './Enumeration';

export class MapTypeEnumeration extends Enumeration {}

export function mapTypeEnumerationFactory(): MapTypeEnumeration {
  return Object.assign(new MapTypeEnumeration(), defaultTopLevelEntity(), {
    type: 'mapTypeEnumeration',
    typeGroupHumanizedName: 'Enumeration',
    enumerationItems: [],
    sourceMap: new EnumerationSourceMap(),
  });
}

export const NoMapTypeEnumeration: MapTypeEnumeration = Object.assign(mapTypeEnumerationFactory(), {
  metaEdName: 'NoMapTypeEnumeration',
});
