// @flow
import { newStringProperty, newStringPropertySourceMap } from './StringProperty';
import type { StringProperty, StringPropertySourceMap } from './StringProperty';
import type { EntityProperty } from './EntityProperty';
import type { MergedProperty } from './MergedProperty';
import type { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';

export type SharedStringPropertySourceMap = {
  ...$Exact<StringPropertySourceMap>,
  mergedProperties: Array<SourceMap>,
};

export function newSharedStringPropertySourceMap(): SharedStringPropertySourceMap {
  return {
    ...newStringPropertySourceMap(),
    referencedEntity: NoSourceMap,
    mergedProperties: [],
  };
}

export type SharedStringProperty = {
  sourceMap: SharedStringPropertySourceMap,
  ...$Exact<StringProperty>,
  mergedProperties: Array<MergedProperty>,
};

export function newSharedStringProperty(): SharedStringProperty {
  return {
    ...newStringProperty(),
    type: 'sharedString',
    typeHumanizedName: 'Shared String Property',
    mergedProperties: [],
    sourceMap: newSharedStringPropertySourceMap(),
  };
}

export const asSharedStringProperty = (x: EntityProperty): SharedStringProperty => ((x: any): SharedStringProperty);
