// @flow
import type { ShortProperty, ShortPropertySourceMap } from './ShortProperty';
import { newShortProperty, newShortPropertySourceMap } from './ShortProperty';
import type { EntityProperty } from './EntityProperty';
import type { MergedProperty } from './MergedProperty';
import type { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';

export type SharedShortPropertySourceMap = {
  ...$Exact<ShortPropertySourceMap>,
  mergedProperties: Array<SourceMap>,
};

export function newSharedShortPropertySourceMap(): SharedShortPropertySourceMap {
  return {
    ...newShortPropertySourceMap(),
    referencedEntity: NoSourceMap,
    mergedProperties: [],
  };
}

export type SharedShortProperty = {
  sourceMap: SharedShortPropertySourceMap,
  ...$Exact<ShortProperty>,
  mergedProperties: Array<MergedProperty>,
};

export function newSharedShortProperty(): SharedShortProperty {
  return {
    ...newShortProperty(),
    type: 'sharedShort',
    typeHumanizedName: 'Shared Short Property',
    mergedProperties: [],
    sourceMap: newSharedShortPropertySourceMap(),
  };
}

export const asSharedShortProperty = (x: EntityProperty): SharedShortProperty => ((x: any): SharedShortProperty);
