// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import { MapTypeEnumeration, mapTypeEnumerationFactory } from './Enumeration';
import type { SourceMap } from './SourceMap';

export class DescriptorSourceMap extends TopLevelEntitySourceMap {
  isMapTypeRequired: ?SourceMap;
  isMapTypeOptional: ?SourceMap;
  mapTypeEnumeration: ?SourceMap;
}

export class Descriptor extends TopLevelEntity {
  isMapTypeRequired: boolean;
  isMapTypeOptional: boolean;
  mapTypeEnumeration: MapTypeEnumeration;
  sourceMap: DescriptorSourceMap;
}

export function descriptorFactory(): Descriptor {
  return Object.assign(new Descriptor(), defaultTopLevelEntity(), {
    type: 'descriptor',
    typeGroupHumanizedName: 'descriptor',
    isMapTypeRequired: false,
    isMapTypeOptional: false,
    mapTypeEnumeration: mapTypeEnumerationFactory(),
    sourceMap: new DescriptorSourceMap(),
  });
}
