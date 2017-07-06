// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, newTopLevelEntity } from './TopLevelEntity';
import { MapTypeEnumeration, newMapTypeEnumeration } from './MapTypeEnumeration';
import type { SourceMap } from './SourceMap';
import type { ModelBase } from './ModelBase';

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

export function newDescriptor(): Descriptor {
  return Object.assign(new Descriptor(), newTopLevelEntity(), {
    type: 'descriptor',
    typeHumanizedName: 'Descriptor',
    isMapTypeRequired: false,
    isMapTypeOptional: false,
    mapTypeEnumeration: newMapTypeEnumeration(),
    sourceMap: new DescriptorSourceMap(),
  });
}

export const asDescriptor = (x: ModelBase): Descriptor => ((x: any): Descriptor);
