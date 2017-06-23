// @flow
import { SharedSimple, SharedSimpleSourceMap, defaultSharedSimple } from './SharedSimple';
import type { SourceMap } from './SourceMap';

export class SharedDecimalSourceMap extends SharedSimpleSourceMap {
  totalDigits: ?SourceMap;
  decimalPlaces: ?SourceMap;
  minValue: ?SourceMap;
  maxValue: ?SourceMap;
}

export class SharedDecimal extends SharedSimple {
  totalDigits: string;
  decimalPlaces: string;
  minValue: string;
  maxValue: string;
  sourceMap: SharedSimpleSourceMap | SharedDecimalSourceMap;
}

export function sharedDecimalFactory(): SharedDecimal {
  return Object.assign(new SharedDecimal(), defaultSharedSimple(), {
    type: 'sharedDecimal',
    typeHumanizedName: 'Shared Decimal',
    totalDigits: '',
    decimalPlaces: '',
    minValue: '',
    maxValue: '',
    sourceMap: new SharedDecimalSourceMap(),
  });
}
