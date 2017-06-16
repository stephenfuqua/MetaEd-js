// @flow

import { SharedSimple, SharedSimpleSourceMap, defaultSharedSimple } from './SharedSimple';
import type { SourceMap } from './SourceMap';

export class SharedStringSourceMap extends SharedSimpleSourceMap {
  minLength: ?SourceMap;
  maxLength: ?SourceMap;
}

export class SharedString extends SharedSimple {
  minLength: string;
  maxLength: string;
  sourceMap: SharedStringSourceMap;
}

export function sharedStringFactory(): SharedString {
  return Object.assign(new SharedString(), defaultSharedSimple(), {
    type: 'sharedString',
    typeGroupHumanizedName: 'Shared String',
    minLength: '',
    maxLength: '',
    sourceMap: new SharedStringSourceMap(),
  });
}
