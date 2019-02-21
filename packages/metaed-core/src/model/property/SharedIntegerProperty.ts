import { newIntegerProperty, newIntegerPropertySourceMap } from './IntegerProperty';
import { IntegerProperty, IntegerPropertySourceMap } from './IntegerProperty';
import { EntityProperty } from './EntityProperty';
import { MergeDirective } from './MergeDirective';
import { SourceMap } from '../SourceMap';

export interface SharedIntegerPropertySourceMap extends IntegerPropertySourceMap {
  mergeDirectives: Array<SourceMap>;
}

/**
 *
 */
export function newSharedIntegerPropertySourceMap(): SharedIntegerPropertySourceMap {
  return {
    ...newIntegerPropertySourceMap(),
    mergeDirectives: [],
  };
}

export interface SharedIntegerProperty extends IntegerProperty {
  sourceMap: SharedIntegerPropertySourceMap;
  mergeDirectives: Array<MergeDirective>;
}

/**
 *
 */
export function newSharedIntegerProperty(): SharedIntegerProperty {
  return {
    ...newIntegerProperty(),
    type: 'sharedInteger',
    typeHumanizedName: 'Shared Integer Property',
    mergeDirectives: [],
    sourceMap: newSharedIntegerPropertySourceMap(),
  };
}

/**
 *
 */
export const asSharedIntegerProperty = (x: EntityProperty): SharedIntegerProperty => x as SharedIntegerProperty;
