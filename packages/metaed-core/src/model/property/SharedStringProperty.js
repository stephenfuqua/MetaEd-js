// @flow
import { newStringProperty } from './StringProperty';
import type { StringProperty, StringPropertySourceMap } from './StringProperty';
import type { EntityProperty } from './EntityProperty';
import type { MergedProperty } from './MergedProperty';
import type { SourceMap } from '../SourceMap';

export type SharedStringPropertySourceMap = {
  ...$Exact<StringPropertySourceMap>,
  mergedProperties: Array<SourceMap>,
};

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
  };
}

export const asSharedStringProperty = (x: EntityProperty): SharedStringProperty => ((x: any): SharedStringProperty);
