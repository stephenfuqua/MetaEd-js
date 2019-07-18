import deepFreeze from 'deep-freeze';
import { ModelType } from './ModelType';
import { ModelBase, ModelBaseSourceMap, newModelBaseSourceMap, newModelBase } from './ModelBase';
import { SourceMap, NoSourceMap } from './SourceMap';
import { NoTopLevelEntity, TopLevelEntity } from './TopLevelEntity';

export interface InterchangeItemSourceMap extends ModelBaseSourceMap {
  referencedType: SourceMap;
  referencedNamespaceName: SourceMap;
  referencedEntity: SourceMap;
  referencedEntityDeprecated: SourceMap;
  typeHumanizedName: SourceMap;
}

/**
 *
 */
export function newInterchangeItemSourceMap(): InterchangeItemSourceMap {
  return {
    ...newModelBaseSourceMap(),
    referencedType: NoSourceMap,
    referencedNamespaceName: NoSourceMap,
    referencedEntity: NoSourceMap,
    referencedEntityDeprecated: NoSourceMap,
    typeHumanizedName: NoSourceMap,
  };
}

export interface InterchangeItem extends ModelBase {
  sourceMap: InterchangeItemSourceMap;
  referencedType: ModelType[];
  referencedNamespaceName: string;
  referencedEntity: TopLevelEntity;
  referencedEntityDeprecated: boolean;
  typeHumanizedName: string;
}

/**
 *
 */
export function newInterchangeItem(): InterchangeItem {
  return {
    ...newModelBase(),
    type: 'interchangeItem',
    typeHumanizedName: 'Interchange Item',
    referencedType: [],
    referencedNamespaceName: '',
    referencedEntity: NoTopLevelEntity,
    referencedEntityDeprecated: false,
    sourceMap: newInterchangeItemSourceMap(),
  };
}

/**
 *
 */
export const NoInterchangeItem: InterchangeItem = deepFreeze({
  ...newInterchangeItem(),
  metaEdName: 'NoInterchangeItem',
});

/**
 *
 */
export const asInterchangeItem = (x: ModelBase): InterchangeItem => x as InterchangeItem;
