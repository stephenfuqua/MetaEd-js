// @flow
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newNamespaceInfo } from './NamespaceInfo';
import type { SourceMap } from './SourceMap';
import type { ModelType } from './ModelType';
import { newTopLevelEntity } from './TopLevelEntity';
import type { TopLevelEntity } from './TopLevelEntity';

export class InterchangeItemSourceMap extends ModelBaseSourceMap {
  referencedType: ?SourceMap;
}

export class InterchangeItem extends ModelBase {
  typeHumanizedName: string;
  referencedType: ModelType;
  referencedEntity: TopLevelEntity;
  sourceMap: InterchangeItemSourceMap;
}

export function newInterchangeItem(): InterchangeItem {
  return Object.assign(new InterchangeItem(), {
    type: 'interchangeItem',
    typeHumanizedName: 'Interchange Item',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: newNamespaceInfo(),
    referencedType: 'unknown',
    referencedEntity: newTopLevelEntity(),
    sourceMap: new InterchangeItemSourceMap(),
  });
}

export const NoInterchangeItem: InterchangeItem = Object.assign(newInterchangeItem(), {
  metaEdName: 'NoInterchangeItem',
});

export const asInterchangeItem = (x: ModelBase): InterchangeItem => ((x: any): InterchangeItem);
