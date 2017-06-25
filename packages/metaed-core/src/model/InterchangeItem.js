// @flow
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { namespaceInfoFactory } from './NamespaceInfo';
import type { SourceMap } from './SourceMap';
import type { ModelType } from './ModelType';
import { defaultTopLevelEntity } from './TopLevelEntity';
import type { TopLevelEntity } from './TopLevelEntity';

export class InterchangeItemSourceMap extends ModelBaseSourceMap {
  referencedType: ?SourceMap;
}

export class InterchangeItem extends ModelBase {
  referencedType: ModelType;
  referencedEntity: TopLevelEntity;
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
    referencedEntity: defaultTopLevelEntity(),
    sourceMap: new InterchangeItemSourceMap(),
  });
}

export const NoInterchangeItem: InterchangeItem = Object.assign(interchangeItemFactory(), {
  metaEdName: 'NoInterchangeItem',
});

export const asInterchangeItem = (x: ModelBase): InterchangeItem => ((x: any): InterchangeItem);
