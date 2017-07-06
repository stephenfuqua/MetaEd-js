// @flow
import { SharedSimple, SharedSimpleSourceMap, defaultSharedSimple } from './SharedSimple';
import type { ModelBase } from './ModelBase';
import type { SourceMap } from './SourceMap';

export class SharedStringSourceMap extends SharedSimpleSourceMap {
  minLength: ?SourceMap;
  maxLength: ?SourceMap;
}

// Note these are XSD specific with the advent of SharedString, and creation should be move to XSD enhancers
export class SharedString extends SharedSimple {
  minLength: string;
  maxLength: string;
  sourceMap: SharedSimpleSourceMap | SharedStringSourceMap;
}

export function newSharedString(): SharedString {
  return Object.assign(new SharedString(), defaultSharedSimple(), {
    type: 'sharedString',
    typeHumanizedName: 'Shared String',
    minLength: '',
    maxLength: '',
    sourceMap: new SharedStringSourceMap(),
  });
}

export const asSharedString = (x: ModelBase): SharedString => ((x: any): SharedString);
