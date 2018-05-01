// @flow
import deepFreeze from 'deep-freeze';
import type { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newModelBaseSourceMap } from './ModelBase';
import { newNamespace } from './Namespace';
import type { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';

export type EnumerationItemSourceMap = {
  ...$Exact<ModelBaseSourceMap>,
  shortDescription: SourceMap,
  typeHumanizedName: SourceMap,
};

export function newEnumerationItemSourceMap(): EnumerationItemSourceMap {
  return {
    ...newModelBaseSourceMap(),
    shortDescription: NoSourceMap,
    typeHumanizedName: NoSourceMap,
  };
}

export type EnumerationItem = {
  sourceMap: EnumerationItemSourceMap,
  ...$Exact<ModelBase>,
  shortDescription: string,
  typeHumanizedName: string,
};

export function newEnumerationItem(): EnumerationItem {
  return {
    type: 'enumerationItem',
    typeHumanizedName: 'Enumeration Item',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespace: newNamespace(),
    shortDescription: '',
    sourceMap: newEnumerationItemSourceMap(),
    data: {},
    config: {},
  };
}

export const NoEnumerationItem: EnumerationItem = deepFreeze({
  ...newEnumerationItem(),
  metaEdName: 'NoEnumerationItem',
  shortDescription: 'NoEnumerationItem',
});

export const asEnumerationItem = (x: ModelBase): EnumerationItem => ((x: any): EnumerationItem);
