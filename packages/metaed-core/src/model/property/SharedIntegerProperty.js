// @flow
import { newIntegerProperty, newIntegerPropertySourceMap } from './IntegerProperty';
import type { IntegerProperty, IntegerPropertySourceMap } from './IntegerProperty';
import type { EntityProperty } from './EntityProperty';
import type { MergedProperty } from './MergedProperty';
import type { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';

export type SharedIntegerPropertySourceMap = {
  ...$Exact<IntegerPropertySourceMap>,
  mergedProperties: Array<SourceMap>,
};

/**
 *
 */
export function newSharedIntegerPropertySourceMap(): SharedIntegerPropertySourceMap {
  return {
    ...newIntegerPropertySourceMap(),
    referencedEntity: NoSourceMap,
    mergedProperties: [],
  };
}

export type SharedIntegerProperty = {
  sourceMap: SharedIntegerPropertySourceMap,
  ...$Exact<IntegerProperty>,
  mergedProperties: Array<MergedProperty>,
};

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
export const asSharedIntegerProperty = (x: EntityProperty): SharedIntegerProperty => ((x: any): SharedIntegerProperty);
