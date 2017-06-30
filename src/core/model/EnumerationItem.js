// @flow
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { namespaceInfoFactory } from './NamespaceInfo';
import type { SourceMap } from './SourceMap';

export class EnumerationItemSourceMap extends ModelBaseSourceMap {
  shortDescription: ?SourceMap;
}

export class EnumerationItem extends ModelBase {
  shortDescription: string;
  sourceMap: ModelBaseSourceMap & EnumerationItemSourceMap;
}

export function enumerationItemFactory(): EnumerationItem {
  return Object.assign(new EnumerationItem(), {
    type: 'enumerationItem',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: namespaceInfoFactory(),
    shortDescription: '',
    sourceMap: new EnumerationItemSourceMap(),
  });
}

export const NoEnumerationItem: EnumerationItem = Object.assign(enumerationItemFactory(), {
  metaEdName: 'NoEnumerationItem',
  shortDescription: 'NoEnumerationItem',
});

export const asEnumerationItem = (x: ModelBase): EnumerationItem => ((x: any): EnumerationItem);
