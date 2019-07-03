import deepFreeze from 'deep-freeze';
import { ModelBase, ModelBaseSourceMap, newModelBaseSourceMap, newModelBase } from './ModelBase';
import { SourceMap, NoSourceMap } from './SourceMap';

export interface EnumerationItemSourceMap extends ModelBaseSourceMap {
  shortDescription: SourceMap;
  typeHumanizedName: SourceMap;
}

/**
 *
 */
export function newEnumerationItemSourceMap(): EnumerationItemSourceMap {
  return {
    ...newModelBaseSourceMap(),
    shortDescription: NoSourceMap,
    typeHumanizedName: NoSourceMap,
  };
}

export interface EnumerationItem extends ModelBase {
  sourceMap: EnumerationItemSourceMap;
  shortDescription: string;
  typeHumanizedName: string;
}

/**
 *
 */
export function newEnumerationItem(): EnumerationItem {
  return {
    ...newModelBase(),
    type: 'enumerationItem',
    typeHumanizedName: 'Enumeration Item',
    shortDescription: '',
    sourceMap: newEnumerationItemSourceMap(),
  };
}

/**
 *
 */
export const NoEnumerationItem: EnumerationItem = deepFreeze({
  ...newEnumerationItem(),
  metaEdName: 'NoEnumerationItem',
  shortDescription: 'NoEnumerationItem',
});

/**
 *
 */
export const asEnumerationItem = (x: ModelBase): EnumerationItem => x as EnumerationItem;
