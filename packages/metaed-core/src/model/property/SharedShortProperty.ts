import { ShortProperty, ShortPropertySourceMap } from './ShortProperty';
import { newShortProperty, newShortPropertySourceMap } from './ShortProperty';
import { EntityProperty } from './EntityProperty';
import { MergeDirective } from './MergeDirective';
import { SourceMap } from '../SourceMap';

export interface SharedShortPropertySourceMap extends ShortPropertySourceMap {
  mergeDirectives: SourceMap[];
}

/**
 *
 */
export function newSharedShortPropertySourceMap(): SharedShortPropertySourceMap {
  return {
    ...newShortPropertySourceMap(),
    mergeDirectives: [],
  };
}

export interface SharedShortProperty extends ShortProperty {
  sourceMap: SharedShortPropertySourceMap;
  mergeDirectives: MergeDirective[];
}

/**
 *
 */
export function newSharedShortProperty(): SharedShortProperty {
  return {
    ...newShortProperty(),
    type: 'sharedShort',
    typeHumanizedName: 'Shared Short Property',
    mergeDirectives: [],
    sourceMap: newSharedShortPropertySourceMap(),
  };
}

/**
 *
 */
export const asSharedShortProperty = (x: EntityProperty): SharedShortProperty => x as SharedShortProperty;
