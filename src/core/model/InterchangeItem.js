// @flow
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { namespaceInfoFactory } from './NamespaceInfo';
import type { SourceMap } from './SourceMap';
import type { ModelType } from './ModelType';

export class InterchangeItemSourceMap extends ModelBaseSourceMap {
  referencedType: ?SourceMap;
}

export class InterchangeItem extends ModelBase {
  referencedType: ?ModelType;
  sourceMap: InterchangeItemSourceMap;
}

export function interchangeItemFactory(): InterchangeItem {
  return Object.assign(new InterchangeItem(), {
    type: 'unknown',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: namespaceInfoFactory(),
    referencedType: 'unknown',
    sourceMap: new InterchangeItemSourceMap(),
  });
}

export const NoInterchangeItem: InterchangeItem = Object.assign(interchangeItemFactory(), {
  metaEdName: 'NoInterchangeItem',
});
