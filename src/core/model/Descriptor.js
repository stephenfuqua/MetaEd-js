// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import { MapTypeEnumeration, mapTypeEnumerationFactory } from './MapTypeEnumeration';
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
  sourceMap: TopLevelEntitySourceMap | DescriptorSourceMap;
}

export function descriptorFactory(): Descriptor {
  return Object.assign(new Descriptor(), defaultTopLevelEntity(), {
    type: 'descriptor',
    typeHumanizedName: 'Descriptor',
    isMapTypeRequired: false,
    isMapTypeOptional: false,
    mapTypeEnumeration: mapTypeEnumerationFactory(),
    sourceMap: new DescriptorSourceMap(),
  });
}

export const asDescriptor = (x: TopLevelEntity): Descriptor => ((x: any): Descriptor);
