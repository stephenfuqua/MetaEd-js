// @flow
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newNamespaceInfo } from './NamespaceInfo';
import type { SourceMap } from './SourceMap';

export class EnumerationItemSourceMap extends ModelBaseSourceMap {
  shortDescription: ?SourceMap;
}

export class EnumerationItem extends ModelBase {
  shortDescription: string;
  sourceMap: ModelBaseSourceMap & EnumerationItemSourceMap;
}

export function newEnumerationItem(): EnumerationItem {
  return Object.assign(new EnumerationItem(), {
    type: 'enumerationItem',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: newNamespaceInfo(),
    shortDescription: '',
    sourceMap: new EnumerationItemSourceMap(),
  });
}

export const NoEnumerationItem: EnumerationItem = Object.assign(newEnumerationItem(), {
  metaEdName: 'NoEnumerationItem',
  shortDescription: 'NoEnumerationItem',
});

export const asEnumerationItem = (x: ModelBase): EnumerationItem => ((x: any): EnumerationItem);
