import deepFreeze from 'deep-freeze';
import { ModelType } from './ModelType';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';
import { newModelBaseSourceMap } from './ModelBase';
import { newNamespace } from './Namespace';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import { NoTopLevelEntity } from './TopLevelEntity';
import { TopLevelEntity } from './TopLevelEntity';

export interface InterchangeItemSourceMap extends ModelBaseSourceMap {
  referencedType: SourceMap;
  referencedEntity: SourceMap;
  typeHumanizedName: SourceMap;
}

/**
 *
 */
export function newInterchangeItemSourceMap(): InterchangeItemSourceMap {
  return {
    ...newModelBaseSourceMap(),
    referencedType: NoSourceMap,
    referencedEntity: NoSourceMap,
    typeHumanizedName: NoSourceMap,
  };
}

export interface InterchangeItem extends ModelBase {
  sourceMap: InterchangeItemSourceMap;
  referencedType: Array<ModelType>;
  referencedEntity: TopLevelEntity;
  typeHumanizedName: string;
}

/**
 *
 */
export function newInterchangeItem(): InterchangeItem {
  return {
    type: 'interchangeItem',
    typeHumanizedName: 'Interchange Item',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespace: newNamespace(),
    referencedType: [],
    referencedEntity: NoTopLevelEntity,
    sourceMap: newInterchangeItemSourceMap(),
    data: {},
    config: {},
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
