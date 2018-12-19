import { newStringProperty, newStringPropertySourceMap } from './StringProperty';
import { StringProperty, StringPropertySourceMap } from './StringProperty';
import { EntityProperty } from './EntityProperty';
import { MergedProperty } from './MergedProperty';
import { SourceMap } from '../SourceMap';

export interface SharedStringPropertySourceMap extends StringPropertySourceMap {
  mergedProperties: Array<SourceMap>;
}

/**
 *
 */
export function newSharedStringPropertySourceMap(): SharedStringPropertySourceMap {
  return {
    ...newStringPropertySourceMap(),
    mergedProperties: [],
  };
}

export interface SharedStringProperty extends StringProperty {
  sourceMap: SharedStringPropertySourceMap;
  mergedProperties: Array<MergedProperty>;
}

/**
 *
 */
export function newSharedStringProperty(): SharedStringProperty {
  return {
    ...newStringProperty(),
    type: 'sharedString',
    typeHumanizedName: 'Shared String Property',
    mergedProperties: [],
    sourceMap: newSharedStringPropertySourceMap(),
  };
}

/**
 *
 */
export const asSharedStringProperty = (x: EntityProperty): SharedStringProperty => x as SharedStringProperty;
