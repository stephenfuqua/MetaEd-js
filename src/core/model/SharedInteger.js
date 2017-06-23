// @flow

import { SharedSimple, SharedSimpleSourceMap, defaultSharedSimple } from './SharedSimple';
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

export function sharedIntegerFactory(): SharedInteger {
  return Object.assign(new SharedInteger(), defaultSharedSimple(), {
    type: 'sharedInteger',
    typeHumanizedName: 'Shared Integer',
    isShort: false,
    minValue: '',
    maxValue: '',
    sourceMap: new SharedIntegerSourceMap(),
  });
}
