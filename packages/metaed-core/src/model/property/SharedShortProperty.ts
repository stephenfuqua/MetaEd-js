import { ShortProperty, ShortPropertySourceMap } from './ShortProperty';
import { newShortProperty, newShortPropertySourceMap } from './ShortProperty';
import { EntityProperty } from './EntityProperty';
import { MergedProperty } from './MergedProperty';
import { SourceMap } from '../SourceMap';

export interface SharedShortPropertySourceMap extends ShortPropertySourceMap {
  mergedProperties: Array<SourceMap>;
}

/**
 *
 */
export function newSharedShortPropertySourceMap(): SharedShortPropertySourceMap {
  return {
    ...newShortPropertySourceMap(),
    mergedProperties: [],
  };
}

export interface SharedShortProperty extends ShortProperty {
  sourceMap: SharedShortPropertySourceMap;
  mergedProperties: Array<MergedProperty>;
}

/**
 *
 */
export function newSharedShortProperty(): SharedShortProperty {
  return {
    ...newShortProperty(),
    type: 'sharedShort',
    typeHumanizedName: 'Shared Short Property',
    mergedProperties: [],
    sourceMap: newSharedShortPropertySourceMap(),
  };
}

/**
 *
 */
export const asSharedShortProperty = (x: EntityProperty): SharedShortProperty => x as SharedShortProperty;
