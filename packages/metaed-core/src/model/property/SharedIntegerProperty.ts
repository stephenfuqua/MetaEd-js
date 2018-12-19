import { newIntegerProperty, newIntegerPropertySourceMap } from './IntegerProperty';
import { IntegerProperty, IntegerPropertySourceMap } from './IntegerProperty';
import { EntityProperty } from './EntityProperty';
import { MergedProperty } from './MergedProperty';
import { SourceMap } from '../SourceMap';

export interface SharedIntegerPropertySourceMap extends IntegerPropertySourceMap {
  mergedProperties: Array<SourceMap>;
}

/**
 *
 */
export function newSharedIntegerPropertySourceMap(): SharedIntegerPropertySourceMap {
  return {
    ...newIntegerPropertySourceMap(),
    mergedProperties: [],
  };
}

export interface SharedIntegerProperty extends IntegerProperty {
  sourceMap: SharedIntegerPropertySourceMap;
  mergedProperties: Array<MergedProperty>;
}

/**
 *
 */
export function newSharedIntegerProperty(): SharedIntegerProperty {
  return {
    ...newIntegerProperty(),
    type: 'sharedInteger',
    typeHumanizedName: 'Shared Integer Property',
    mergedProperties: [],
    sourceMap: newSharedIntegerPropertySourceMap(),
  };
}

/**
 *
 */
export const asSharedIntegerProperty = (x: EntityProperty): SharedIntegerProperty => x as SharedIntegerProperty;
