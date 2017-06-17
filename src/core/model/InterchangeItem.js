// @flow
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { namespaceInfoFactory } from './NamespaceInfo';
import { TopLevelEntity } from './TopLevelEntity';
import type { SourceMap } from './SourceMap';

export class InterchangeItemSourceMap extends ModelBaseSourceMap {
  referencedEntity: ?SourceMap;
}

export class InterchangeItem extends ModelBase {
  referencedEntity: ?TopLevelEntity;
  sourceMap: InterchangeItemSourceMap;
}

export function interchangeItemFactory(): InterchangeItem {
  return Object.assign(new InterchangeItem(), {
    type: 'unknown',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: namespaceInfoFactory(),
    referencedEntity: null,
    sourceMap: new InterchangeItemSourceMap(),
  });
}

export const NoInterchangeItem: InterchangeItem = Object.assign(interchangeItemFactory(), {
  metaEdName: 'NoInterchangeItem',
});
