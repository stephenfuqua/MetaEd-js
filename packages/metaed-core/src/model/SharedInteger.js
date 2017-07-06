// @flow
import { SharedSimple, SharedSimpleSourceMap, defaultSharedSimple } from './SharedSimple';
import type { ModelBase } from './ModelBase';
import type { SourceMap } from './SourceMap';

export class SharedIntegerSourceMap extends SharedSimpleSourceMap {
  isShort: ?SourceMap;
  minValue: ?SourceMap;
  maxValue: ?SourceMap;
}

export class SharedInteger extends SharedSimple {
  isShort: boolean;
  minValue: string;
  maxValue: string;
  sourceMap: SharedSimpleSourceMap | SharedIntegerSourceMap;
}

export function newSharedInteger(): SharedInteger {
  return Object.assign(new SharedInteger(), defaultSharedSimple(), {
    type: 'sharedInteger',
    typeHumanizedName: 'Shared Integer',
    isShort: false,
    minValue: '',
    maxValue: '',
    sourceMap: new SharedIntegerSourceMap(),
  });
}

export const asSharedInteger = (x: ModelBase): SharedInteger => ((x: any): SharedInteger);
